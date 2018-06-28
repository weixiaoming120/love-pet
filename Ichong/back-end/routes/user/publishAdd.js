var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
var PublishR = require('../../db/publish-recruit');

router.get('/', function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'content-type');
        var dailyid=req.query.dailyid;
        console.log("id"+dailyid);      
        var petname=req.query.petname;
        var date=req.query.date;
        var pubcontent = req.query.pubcontent;
        console.log('petname'+petname);
        console.log('date'+date);
        console.log('pubcontent'+pubcontent);
       
       var newPublish = new PublishR({
          dailyid:dailyid,
          petname:petname,
          date:date,
          pubcontent:pubcontent
       });

          //获取用户信息
          newPublish.updateData(newPublish.dailyid,newPublish,function(err,results){
            res.send(results);
          });
       

 });    
module.exports = router;