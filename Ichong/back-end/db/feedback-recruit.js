var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var pool = mysql.createPool( dbConfig.mysql );
var DB_NAME = dbConfig.name;

pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  

function FeedbackR(admin){
      this.username=admin.username;
     this.state=admin.state;
     this.phonenumber=admin.phonenumber;
     this.email=admin.email;
     this.feedback_type=admin.feedback_type;
};
module.exports =FeedbackR;

pool.getConnection(function(err, connection) {

    //保存数据
    FeedbackR.prototype.save = function save(admin,callback) {
        pool.getConnection(function (err, connection) {

            var insert_Sql = "INSERT INTO feedback_manage_table(username,state,phonenumber,email,feedback_type) VALUES(?,?,?,?,?)";

            connection.query(insert_Sql, [admin.username,admin.state,admin.phonenumber,admin.email,admin.feedback_type], function (err, result) {

                connection.release();
                if (err) {
                    console.log("insert_Sql Error: " + err.message);
                    return;
                }
                callback(err, result);
            });
        });
    };

 
});