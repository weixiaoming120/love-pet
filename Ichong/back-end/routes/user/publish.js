var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
var pool = mysql.createPool( dbConfig.mysql );
var PublishR = require('../../db/publish-recruit');
router.get('/', function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'content-type');

        var username=req.query.username;
        console.log('username'+username)
       var newPublish = new PublishR({
          username: username,
       });

          //获取用户信息
          PublishR.getpublish(newPublish.username,function(err,results){
            res.send(results);
          });
       

 });
router.get('/del', function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'content-type');

        var date=req.query.date;
        console.log('date'+date);
       var newPublish = new PublishR({
          date: date
       });
       
       newPublish.deleteData(newPublish.date,function(err,results){
        if(err){
          return;
        }
        res.send(results);
       })

 });
module.exports = router;