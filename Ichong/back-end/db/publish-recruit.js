var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var pool = mysql.createPool( dbConfig.mysql );
var DB_NAME = dbConfig.name;
console.log(DB_NAME);
pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  

function PublishR(admin){
    this.username = admin.username;
    this.petname = admin.petname;
    this.pubcontent= admin.pubcontent;
    this.date = admin.date;
    this.dailyid=admin.dailyid;
};
module.exports = PublishR;

pool.getConnection(function(err, connection) {

    PublishR.prototype.updateData = function updateData(dailyid,data,callback){
        pool.getConnection(function(err,connection){
            
            var update_Sql = "UPDATE publish SET petname = ?,pubcontent=?,date = ?  WHERE dailyid =?";

            connection.query(update_Sql,[data.petname,data.pubcontent,data.date,dailyid],function (err, result) {
              
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
    PublishR.prototype.save = function save(admin,callback) {

        pool.getConnection(function (err, connection) {

            var insertpublish_Sql = "INSERT INTO publish(username,petname,pubpic,pubcontent,date) VALUES(?,?,?,?,?)";

            connection.query(insertpublish_Sql, [admin.username, admin.petname,admin.pubpic,admin.pubcontent,admin.date], function (err, result) {

                connection.release();
                if (err) {
                    console.log("insertpublish_Sql Error: " + err.message);
                    return;
                }
                callback(err, result);
            });
        });
    };

    
    PublishR.getpublish= function getpublish(username,callback) {
        
       pool.getConnection(function(err, connection) { 
            var getpublish_sql =  "SELECT * FROM publish WHERE username = ? order by dailyid desc";
            var getpublish_sql1 = "SELECT * FROM publish order by dailyid desc";
            if(username!='undefined'){
                connection.query(getpublish_sql , [username], function (err, result) {  
                    if (err) {
                        console.log("getpublish_sql Error: " + err.message);
                        return;
                    }
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
            else{
                connection.query(getpublish_sql1, function (err, result) {  
                    if (err) {
                        console.log("getpublish_sql1 Error: " + err.message);
                        return;
                    }
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
        });
    };

 PublishR.prototype.deleteData = function deleteData(date,callback){
        pool.getConnection(function(err,connection){
            var deletePublish_Sql = "DELETE FROM publish WHERE date = ?";

            connection.query(deletePublish_Sql, [date] , function (err, result) {
                
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