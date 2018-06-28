var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var pool = mysql.createPool( dbConfig.mysql );
var DB_NAME = dbConfig.name;

pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  

function PetshopR(admin){
    this.petshopname = admin.petshopname;
    this.petshopimage = admin.petshopimage;
    this.petshopaddress = admin.petshopaddress;
    this.petshopregion = admin.petshopregion;
};
module.exports =PetshopR;

pool.getConnection(function(err, connection) {

   
    //查询数据
   PetshopR.getpetshop= function getpetshop(petshopregion,callback) {
        
       pool.getConnection(function(err, connection) { 
            var getpetshop_sql =  "SELECT * FROM fosterpetmanage WHERE petshopregion = ? order by petshopid desc";
            var getpetshop_sql1 = "SELECT * FROM fosterpetmanage order by petshopid desc";
            if(petshopregion!='undefined'){
                connection.query(getpetshop_sql , [petshopregion], function (err, result) {  
                    if (err) {
                        console.log("getpetshop_sql Error: " + err.message);
                        return;
                    }
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
           else{
                connection.query(getpetshop_sql1, function (err, result) {  
                    if (err) {
                        console.log("getpetshop_sql1 Error: " + err.message);
                        return;
                    }
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
        });
    };

    
 
});