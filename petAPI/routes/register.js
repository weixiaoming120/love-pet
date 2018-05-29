var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/usersql');
var AdminR = require('../db/user-recruit');

router.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var username=req.query.username;
    var password=req.query.password;
    var status= req.query.status;
    var telephone = req.query.telephone;    
   
    console.log('param:'+status);
    console.log('username:'+username);
    console.log('telephone:'+telephone);
    console.log('password:'+password);
    
    var newUser = new AdminR({
      username: username,
      password: password,
      telephone:telephone,
      status: status
    });

    AdminR.getUserNumByName(newUser.username,function(err,results){

      if(newUser.username != undefined && newUser.username != ''){

        if(newUser.status === 'register'){
          if(results[0]['num'] == 0){
  
              //向数据库存储数据
              newUser.save({username:newUser.username,password:newUser.password,telephone:newUser.telephone},function(err,results){
                if(err){
                  res.locals.error = err;
                  return;
                }
              })
              //返回响应数据
              res.send('1');
              console.log('注册成功');
          }
          if(results[0]['num'] > 0){
            res.send('2');
            console.log('用户名已存在');
          }
        }

    }

    });
});
module.exports = router;