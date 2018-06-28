var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var pool = mysql.createPool( dbConfig.mysql );
var DB_NAME = dbConfig.name;

pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  

function PetR(admin){
    this.id=admin.id;
    this.petname = admin.petname;
    this.petimage = admin.petimage;
    this.phone = admin.phone;
    this.status = admin.status;
    this.address = admin.address;
    this.petinformation = admin.petinformation;
   
};
module.exports =PetR;
pool.getConnection(function(err, connection) {

    PetR.prototype.updateData = function updateData(id,data,callback){
        pool.getConnection(function(err,connection){
            
            var update_Sql = "UPDATE takemehome SET petname = ?,petinformation=?,address = ?,phone=?  WHERE id =?";

            connection.query(update_Sql,[data.petname,data.address,data.phone,data.petinformation,id],function (err, result) {
              
                if(err){
                      console.log('[UPDATE ERROR] - ',err.message);  
                      return;
                }            
               console.log('UPDATE affectedRows',result.affectedRows);
               callback(err,result);
            })
        })
    }
pool.getConnection(function(err, connection) {

    PetR.prototype.save = function save(admin,callback) {s
        pool.getConnection(function (err, connection) {

            var insertPetlist_Sql = "INSERT INTO takemehome(petname,phone,address,petinformation) VALUES(?,?,?,?)";

            connection.query(insertPetlist_Sql, [admin.petname,admin.phone,admin.address,admin.petinformation], function (err, result) {

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

 });  
});