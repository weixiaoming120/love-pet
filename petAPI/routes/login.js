var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/usersql');
var AdminR = require('../db/user-recruit');


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

module.exports = router;