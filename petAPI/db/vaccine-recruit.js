var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var pool = mysql.createPool( dbConfig.mysql );
var DB_NAME = dbConfig.name;

pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  

function VaccineR(admin){
    this.userid=admin.userid;
    this.petid=admin.petid;
    this.vaccinename = admin.vaccinename;
    this.petage = admin.petage;
    this.status = admin.status;
   
};
module.exports =VaccineR;

pool.getConnection(function(err, connection) {

    //保存数据
    VaccineR.prototype.save = function save(admin,callback) {
        pool.getConnection(function (err, connection) {

            var insertvaccine_Sql = "INSERT INTO vaccine(userid,petid,vaccinename,petage,status) VALUES(?,?,?,?,?)";

            connection.query(insertvaccine_Sql, [admin.userid,admin.petid,admin.vaccinename,admin.petage,admin.status], function (err, result) {

                connection.release();
                if (err) {
                    console.log("insertPetmessage_Sql Error: " + err.message);
                    return;
                }
                callback(err, result);
            });
        });
    };

    //删除数据
    // AdminR.prototype.deleteData = function deleteData(username,callback){
    //     pool.getConnection(function(err,connection){
    //         var deleteUser_Sql = "DELETE FROM user_recruit WHERE username = ?";
            
    //         console.log('111111111111111111'+username);

    //         connection.query(deleteUser_Sql, [username] , function (err, result) {
                
    //             if(err){
    //                 console.log('[DELETE ERROR] - ',err.message);
    //                 return;
    //             }

    //             callback(err,result);
           
    //             console.log('----------DELETE-------------');
    //             console.log('DELETE affectedRows',result.affectedRows);
    //             console.log('******************************');
    //             connection.release();
    //         });
    //     })
    // }

    //修改数据
    // AdminR.prototype.updateData = function updateData(username,data,callback){
    //     pool.getConnection(function(err,connection){
            
    //         var updateUser_Sql = "UPDATE user_recruit SET phone = ?,email = ?,password =? where username =?";

    //         connection.query(updateUser_Sql,[data.phone,data.email,data.password,username],function (err, result) {
              
    //             if(err){
    //                   console.log('[UPDATE ERROR] - ',err.message);  
    //                   return;
    //             }            
    //            console.log('UPDATE affectedRows',result.affectedRows);
    //            callback(err,result);
    //         })
    //     })
    // }

    //根据用户名得到用户数量
    // AdminR.getUserNumByName = function getUserNumByName(username, callback) {

    //     pool.getConnection(function (err, connection) {
    //         var getUserNumByName_Sql = "SELECT COUNT(1) AS num FROM login WHERE username = ?";

    //         connection.query(getUserNumByName_Sql, [username], function (err, result) {

    //             connection.release();
    //             if (err) {
    //                 console.log("getUserNumByName Error: " + err.message);
    //                 return;
    //             }
    //             callback(err, result);
    //         });
    //     });
    // };

    // //根据用户名得到用户信息
    // AdminR.getUserByUserName = function getUserByUserName(username, callback) {
        
    //     pool.getConnection(function (err, connection) {
    //         var getUserByUserName_Sql = "SELECT * FROM login WHERE username = ?";
    //         var getUserByUserName_Sql1 = "SELECT * FROM login";

    //         //如果username存在，则返回相关用户信息
    //         if(username != undefined){
    //             connection.query(getUserByUserName_Sql, [username], function (err, result) {  
    //                 if (err) {
    //                     console.log("getUserByUserName Error: " + err.message);
    //                     return;
    //                 }
    //                 callback(err, result);
    
    //                 //当连接不再使用时，用connection对象的release方法将其归还到连接池中
    //                 connection.release();
    //             });
    //         }
    //         //如果username不存在，则返回全部用户信息
    //         else{
    //             connection.query(getUserByUserName_Sql1, function (err, result) {  
    //                 if (err) {
    //                     console.log("getUserByUserName Error: " + err.message);
    //                     return;
    //                 }
    //                 callback(err, result);
    
    //                 //当连接不再使用时，用connection对象的release方法将其归还到连接池中
    //                 connection.release();
    //             });
    //         }
    //     });
    // };

 

    // AdminR.getPeople = function(sort,callback){

    //     pool.getConnection(function(err,connection){
    //         var getPeople_sql = 'select * from msg_seeker where sort = ?';
    //         connection.query(getPeople_sql, [sort], function (err, result) { 
    //             if (err) {
    //                 console.log("getUserByUserName Error: " + err.message);
    //                 return;
    //             }
    //             callback(err, result);

    //             connection.release();
    //         })
    //     })

    // }

    // AdminR.Label = function Label(callback){

    //     pool.getConnection(function(err,connection){
    //         var Label_sql = "select * from label";
    //         connection.query(Label_sql,function(err,result){
    //             connection.release();

    //             if(err){
    //                 console.log("Label Error:" + err.message);
    //                 return;
    //             }               
    //             callback(err,result);
    //         });
    //     });

    // }


    
 
});