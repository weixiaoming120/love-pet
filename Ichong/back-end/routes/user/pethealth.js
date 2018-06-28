var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
var pool = mysql.createPool( dbConfig.mysql );
var PethealthR = require('../../db/pethealth-recruit');
router.get('/', function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'content-type');

        var username=req.query.username;
        var petname=req.query.petname;
        console.log('username'+username)
        console.log('petname'+petname);
       var newPethealth = new PethealthR({
          username: username,
          petname: petname,
       });

          //获取用户信息
          PethealthR.gethealth(newPethealth.username,newPethealth.petname,function(err,results){
            res.send(results);
          });
       

 });


module.exports = router;