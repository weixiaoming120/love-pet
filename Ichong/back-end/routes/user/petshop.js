var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
var pool = mysql.createPool( dbConfig.mysql );
var PetshopR = require('../../db/petshop-recruit');
router.get('/', function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'content-type');
         // 从连接池获取连接 
        pool.getConnection(function(err, connection) { 
            var petshop_sql = "select * from fosterpetmanage order by petshopid desc";
            connection.query(petshop_sql,  function(err, result) {
                    if(result) {                         
                         res.send(result); 
                    }     
                 // 释放连接  
                  connection.release();  

             });
        });
 });
router.get('/search', function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'content-type');
         // 从连接池获取连接 
        var petshopregion=req.query.petshopregion;
        console.log("地域："+petshopregion);
       
     var newPetshop = new PetshopR({
          petshopregion: petshopregion
       });
       
       PetshopR.getpetshop(newPetshop.petshopregion,function(err,results){
        if(err){
          return;
        }
        res.send(results);
    });
 });

module.exports = router;