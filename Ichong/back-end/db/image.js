var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var pool = mysql.createPool( dbConfig.mysql );

module.exports = {
   
    UpdateImg:function UpdateImg(username,savepath){     
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                var UpdateImg_sql = 'update login set pic=? where username=?';
                connection.query(UpdateImg_sql,[savepath,username],function(err,result){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(result.affectedRows);
                    }
                    connection.release();
                })
            })
        })
    },
  
  
}