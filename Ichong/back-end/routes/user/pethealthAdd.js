var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
var PethealthR = require('../../db/pethealth-recruit');

router.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var username=req.query.username;
    var petname=req.query.petname;
    var height= req.query.height;
    var weight = req.query.weight; 
    console.log("username:"+username);
    console.log('petname'+petname);
    console.log('height'+height);
    console.log('weight'+weight); 
 
    var newPethealth = new PethealthR({
      username:username,
      petname:petname,
      height:height,
      weight :weight, 
    });
    
  
    //向数据库存储数据
    if(newPethealth.height!=='undefined'&&newPethealth.weight!== 'undefined'){
        newPethealth.save({username:newPethealth.username,petname:newPethealth.petname,height:newPethealth.height,weight:newPethealth.weight},function(err,results){
         if(err){
            res.locals.error = err;
            return;
          }
        })
        //返回响应数据
        res.send('1');
        console.log('发布成功');
      }
      else{
        res.send('2');
      }
  });     
module.exports = router;