
var express = require('express');
var router = express.Router();
var mysql  =  require('mysql');
var dbConfig = require('../../db/DBConfig');
var method = require('../../db/method.js');
var fromidable = require('formidable');
var pool = mysql.createPool( dbConfig.mysql );
var Buffer = require('buffer').Buffer;
var fs=  require('fs');
var path = require('path');

router.post('/',function(req,res,next){
    var username = req.body.username;
    var imgData = req.body.imgData;
    var fileName = 'petmessage'+method.getNowFormatDate()+'.jpg';
    
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    console.log(dataBuffer);
    fs.writeFile('./public/upload/'+fileName, dataBuffer, function(err) {
        if(err){
          res.send(err);
        }else{
          pool.getConnection(function (err, connection) {
                var avatarName =fileName;
                var sql = 'insert into petmessage (username,petpic) values(\''+username+'\',\''+avatarName+'\')';
                connection.query(sql, function (err, result) {
                    if (err) {
                        throw err;
                        res.send('0');//修改失败
                        return;
                    }else{
                        res.send({avatar:avatarName});
                        return;
                    }
                });
                connection.release();
            }); 
        }
    });
    

    console.log(fileName);

    
    
    
});
module.exports = router;