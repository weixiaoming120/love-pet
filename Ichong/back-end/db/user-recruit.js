var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
// var database = require('./database');
var pool = mysql.createPool( dbConfig.mysql );
//var AdminR = database.User;
var DB_NAME = dbConfig.name;
console.log(DB_NAME);
pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  

function AdminR(admin){
    this.username = admin.username;
    this.pic=admin.pic;
    this.password = admin.password;
    this.gender = admin.gender;
    this.status = admin.status;
    this.telephone = admin.telephone;
    this.email = admin.email;
    this.introduction = admin.introduction;
};
module.exports = AdminR;

pool.getConnection(function(err, connection) {

    var useDbSql = "USE " + DB_NAME;
    connection.query(useDbSql, function (err) {
         if (err) {
            console.log("USE Error: " + err.message);
            return;
         }
         console.log('USE succeed');
    });

    //保存数据
    AdminR.prototype.save = function save(admin,callback) {
        pool.getConnection(function (err, connection) {

            var insertUser_Sql = "INSERT INTO login(username,password,telephone,gender,email,introduction) VALUES(?,?,?,?,?,?)";

            connection.query(insertUser_Sql, [admin.username, admin.password,admin.telephone,admin.gender,admin.email,admin.introduction], function (err, result) {

                connection.release();
                if (err) {
                    console.log("insertUser_Sql Error: " + err.message);
                    return;
                }

                console.log("invoked[save]");
                callback(err, result);
            });
        });
    };
 


    //修改数据
    AdminR.prototype.updateData = function updateData(username,data,callback){
        pool.getConnection(function(err,connection){
            
            var updateUser_Sql = "UPDATE login SET gender = ?,email = ?,introduction =? where username =?";

            connection.query(updateUser_Sql,[data.gender,data.email,data.introduction,username],function (err, result) {
              
                if(err){
                      console.log('[UPDATE ERROR] - ',err.message);  
                      return;
                }            
               console.log('UPDATE affectedRows',result.affectedRows);
               callback(err,result);
            })
        })
    }
    //修改密码
    AdminR.prototype.updatePwd = function updatePwd(username,data,callback){
        pool.getConnection(function(err,connection){
            
            var updatePwd_Sql = "UPDATE login SET password = ? where username =?";

            connection.query(updatePwd_Sql,[data.password,username],function (err, result) {
              
                if(err){
                      console.log('[UPDATE ERROR] - ',err.message);  
                      return;
                }            
               console.log('UPDATE affectedRows',result.affectedRows);
               callback(err,result);
            })
        })
    }

    //根据用户名得到用户数量
    AdminR.getUserNumByName = function getUserNumByName(username, callback) {

        pool.getConnection(function (err, connection) {
            var getUserNumByName_Sql = "SELECT COUNT(1) AS num FROM login WHERE username = ?";

            connection.query(getUserNumByName_Sql, [username], function (err, result) {

                connection.release();
                if (err) {
                    console.log("getUserNumByName Error: " + err.message);
                    return;
                }
                callback(err, result);
            });
        });
    };

    //根据用户名得到用户信息
    AdminR.getUserByUserName = function getUserByUserName(username, callback) {
        
        pool.getConnection(function (err, connection) {
            var getUserByUserName_Sql = "SELECT * FROM login WHERE username = ?";
            var getUserByUserName_Sql1 = "SELECT * FROM login";

            //如果username存在，则返回相关用户信息
            if(username != undefined){
                connection.query(getUserByUserName_Sql, [username], function (err, result) {  
                    if (err) {
                        console.log("getUserByUserName Error: " + err.message);
                        return;
                    }
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
            //如果username不存在，则返回全部用户信息
            else{
                connection.query(getUserByUserName_Sql1, function (err, result) {  
                    if (err) {
                        console.log("getUserByUserName Error: " + err.message);
                        return;
                    }
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
        });
    };

 

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