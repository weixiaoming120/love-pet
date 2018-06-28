var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var pool = mysql.createPool( dbConfig.mysql );
var DB_NAME = dbConfig.name;

pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  

function articalR(admin){
    this.articalid=admin.articalid;
    this.title=admin.title;
    this.content= admin.content;
    this.pic = admin.pic;
    this.publishtime = admin.publishtime;
    this.articalstatus = admin.articalstatus;
};
module.exports =articalR;

pool.getConnection(function(err, connection) {

   
    articalR.getartical= function getartical(articalstatus,callback) {
        
       pool.getConnection(function(err, connection) { 
            var get_sql =  "SELECT * FROM artical WHERE articalstatus=? order by articalid desc";
            var get_sql1 = "SELECT * FROM artical order by articalid desc";
            if(articalstatus=='true'){
                connection.query(get_sql , [articalstatus], function (err, result) {  
                    if (err) {
                        console.log("get_sql Error: " + err.message);
                        return;
                    }
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
            else{
                connection.query(get_sql1, function (err, result) {  
                    if (err) {
                        console.log("get_sql1 Error: " + err.message);
                        return;
                    }
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
        });
    };

 articalR.prototype.updateData = function updateData(articalid,data,callback){
        pool.getConnection(function(err,connection){
            
            var update_Sql = "UPDATE artical SET articalstatus =? where articalid=?";

            connection.query(update_Sql,[data.articalstatus,articalid],function (err, result) {
              
                if(err){
                      console.log('[UPDATE ERROR] - ',err.message);  
                      return;
                }            
               console.log('UPDATE affectedRows',result.affectedRows);
               callback(err,result);
            })
        })
    }
 
});