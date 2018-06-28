var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
var pool = mysql.createPool( dbConfig.mysql );
var PetR = require('../../db/petmessage-recruit');
router.get('/', function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'content-type');

        var username=req.query.username;
        console.log('username'+username)
        var newPet = new PetR({
          username: username,
        });

          //获取用户信息
          PetR.getpet(newPet.username,function(err,results){
            res.send(results);
          });     

 });
router.get('/del', function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'content-type');

        var petname=req.query.petname;
        console.log('petname'+petname);
       var newPet = new PetR({
          petname: petname
       });
       
       newPet.deleteData(newPet.petname,function(err,results){
        if(err){
          return;
        }
        res.send(results);
        // PetR.getpet(newPet.username,function(err,results){
        //     res.send(results);
        // });
       })

 });

module.exports = router;