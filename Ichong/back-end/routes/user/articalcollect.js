var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
var pool = mysql.createPool( dbConfig.mysql );
var articalR = require('../../db/artical-recruit');
router.get('/', function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'content-type');
         // 从连接池获取连接 
       var articalstatus=req.query.articalstatus;
        
        console.log('articalstatus'+articalstatus);
       var newartical = new articalR({
          articalstatus:articalstatus,
       });

          //获取用户信息
          articalR.getartical(newartical.articalstatus,function(err,results){
            res.send(results);
          });
       
 });
router.get('/collectchange', function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'content-type');

        var articalstatus = req.query.articalstatus;
        console.log('articalstatus'+articalstatus);
        var articalid = req.query.articalid;
        console.log('articalid'+articalid);

       var newartical = new articalR({
          articalstatus:articalstatus,
          articalid:articalid,
       });

          //获取用户信息
          newartical.updateData(newartical.articalid,newartical,function(err,results){
            res.send(results);
          });
       

 });
module.exports = router;