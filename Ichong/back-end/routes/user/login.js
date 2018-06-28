var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
var userSQL = require('../../db/usersql');
var AdminR = require('../../db/user-recruit');

// var multiparty = require('multiparty');
// var fs = require('fs');
router.get('/', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'content-type');

    var username=req.query.username;
    var password=req.query.password;
    var status = req.query.status;
    console.log('param:'+status);
    console.log('username:'+username);
    console.log('userpwd:'+password);

//创建UserS对象
    var newUser = new AdminR({
      username: username,
      password: password,
      status: status
    });
    
   AdminR.getUserNumByName(newUser.username, function (err, results) {
     console.log('数量',results[0].num);

     //登录
    if(newUser.status === 'login'){
        if(results[0]['num'] == 0){
          res.send('3');
          console.log('用户不存在');
        }
        else{
          //获取用户信息
          AdminR.getUserByUserName(newUser.username,function(err,results){
            if(newUser.password === results[0].password){
              res.send('1');
              console.log('登陆成功');
            }
            else{
              res.send('2');
              console.log('密码错误');
            }
          });
        }
    }


   }); 
});
router.get('/get', function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'content-type');

        var username=req.query.username;
        console.log('username'+username);
        
        var newUser = new AdminR({
          username: username,
         
       });

          //获取用户信息
          AdminR.getUserByUserName(newUser.username,function(err,results){
            res.send(results);
          });
       

 });
router.get('/amend', function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'content-type');

        var username=req.query.username;
        console.log('username'+username);
        var gender=req.query.gender;
        var email=req.query.email;
        var introduction = req.query.introduction;
        console.log('gender'+gender);
        console.log('email'+email);
        console.log('introduction'+introduction);
        
        // function getBase64Image(img) {
        //     var canvas = document.createElement("canvas");
        //     canvas.width = img.width;
        //     canvas.height = img.height;
        //     var ctx = canvas.getContext("2d");
        //     ctx.drawImage(img, 0, 0, img.width, img.height);
        //     var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
        //     var dataURL = canvas.toDataURL("image/"+ext);
        //     return dataURL;
        // }
        // var imgLink = pic;
        // var tempImage = new Image();
        // tempImage.src = imgLink;
        // tempImage.crossOrigin = "*";
        // tempImage.onload = function(){
        //     var base64 = getBase64Image(tempImage);
        //     console.log(base64);
        // }
       var newUser = new AdminR({
          username: username,
          gender:gender,
          email:email,
          introduction:introduction
       });

          //获取用户信息
          newUser.updateData(newUser.username,newUser,function(err,results){
            res.send(results);
          });
       

 });
router.get('/repwd', function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'content-type');

        var username=req.query.username;
        console.log('username'+username);
        var password=req.query.password;
        console.log('password'+password);
       var newUser = new AdminR({
          username: username,
          password:password,
       });

          //获取用户信息
          newUser.updatePwd(newUser.username,newUser,function(err,results){
            res.send(results);
          });
       

 });
router.post('/uploadImage', function(req, res){
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files){
        //将前台传来的base64数据去掉前缀
        var imgData = fields.imgData[0].replace(/^data:image\/\w+;base64,/, '');

        var dataBuffer = new Buffer(imgData, 'base64');
        //写入文件
        fs.writeFile('public/images/imge.png', dataBuffer, function(err){
            if(err){
                res.send(err);
            }else{
                res.send('保存成功');
            }
        });

    });

});
module.exports = router;