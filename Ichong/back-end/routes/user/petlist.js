var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
var pool = mysql.createPool( dbConfig.mysql );

router.get('/', function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'content-type');
         // 从连接池获取连接 
        pool.getConnection(function(err, connection) { 
            var petlist_sql = "select * from takemehome order by id desc";
            connection.query(petlist_sql,  function(err, result) {
                    if(result) {      
                         console.log(result);                         
                         res.send(result); 
                    }     
                 // 释放连接  
                  connection.release();  

             });
        });
 });

module.exports = router;