var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var pool = mysql.createPool( dbConfig.mysql );
var DB_NAME = dbConfig.name;

pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  

function PetR(admin){
    this.username = admin.username;
    this.petname = admin.petname;
    this.petid = admin.petid;
    this.petsex= admin.petsex;
    this.petkind = admin.petkind;
    this.petdate = admin.petdate;
   
};
module.exports =PetR;

    
pool.getConnection(function(err, connection) {
    PetR.prototype.updateData = function updateData(petid,data,callback){
        pool.getConnection(function(err,connection){
            
            var update_Sql = "UPDATE petmessage SET petname = ?,petsex=?,petkind = ?,petdate=?  WHERE petid =?";

            connection.query(update_Sql,[data.petname,data.petsex,data.petkind,data.petdate,petid],function (err, result) {
              
                if(err){
                      console.log('[UPDATE ERROR] - ',err.message);  
                      return;
                }            
               console.log('UPDATE affectedRows',result.affectedRows);
               callback(err,result);
            })
        })
    }

    //保存数据
    PetR.prototype.save = function save(admin,callback) {
        pool.getConnection(function (err, connection) {

            var insertPetmessage_Sql = "INSERT INTO petmessage(username,petname,petsex,petkind,petdate) VALUES(?,?,?,?,?)";

            connection.query(insertPetmessage_Sql, [admin.username,admin.petname,admin.petsex,admin.petkind,admin.petdate], function (err, result) {

                connection.release();
                if (err) {
                    console.log("insertPetmessage_Sql Error: " + err.message);
                    return;
                }
                callback(err, result);
            });
        });
    };
    //查询数据
   PetR.getpet= function getpet(username,callback) {
        
       pool.getConnection(function(err, connection) { 
            var getpet_sql =  "SELECT * FROM petmessage WHERE username = ? order by petid desc";
            var getpet_sql1 = "SELECT * FROM petmessage order by petid desc";
            if(username!='undefined'){
                connection.query(getpet_sql , [username], function (err, result) {  
                    if (err) {
                        console.log("getpet_sql Error: " + err.message);
                        return;
                    }
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
            else{
                connection.query(getpet_sql1, function (err, result) {  
                    if (err) {
                        console.log("getpet_sql1 Error: " + err.message);
                        return;
                    }
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
        });
    };

    //删除数据
    PetR.prototype.deleteData = function deleteData(petname,callback){
        pool.getConnection(function(err,connection){
            var deletePet_Sql = "DELETE FROM petmessage WHERE petname = ?";

            connection.query(deletePet_Sql, [petname] , function (err, result) {
                
                if(err){
                    console.log('[DELETE ERROR] - ',err.message);
                    return;
                }

                callback(err,result);
           
                console.log('----------DELETE-------------');
                console.log('DELETE affectedRows',result.affectedRows);
                console.log('******************************');
                connection.release();
            });
        })
    }
});
 
