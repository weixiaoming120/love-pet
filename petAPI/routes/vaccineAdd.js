var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var PetR = require('../db/vaccine-recruit');

router.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var userid=req.query.userid;
    var petid=req.query.petid;
    var vaccinename=req.query.vaccine;
    var petage = req.query.petage; 
    var status= req.query.status;   
    console.log('userid'+userid);
    console.log('petid'+petid);
    console.log('vaccinename:'+vaccinename);
    console.log('petage:'+petage);
    console.log('status:'+status);
  
    var newVaccine = new vaccineR({
      userid:userid,
      petid:petid,
      vaccinename:vaccinename,
      petage:petage,
      status:status,
    });
  
    //向数据库存储数据
    if(newVaccine.vaccinename!== 'undefined'&&newVaccine.petage!=='undefined'&&newVaccine.status!== 'undefined'){
        newVaccine.save({userid:newVaccine.userid,petid:newVaccine.petid,vaccinename:newVaccine.vaccinename,petage:newVaccine.petage,status:newVaccine.status},function(err,results){
          
          if(err){
            res.locals.error = err;
            return;
          }
        })
        //返回响应数据
        res.send('1');
        console.log('发布成功');
      }
      else{
        res.send('2');
      }
  });     
module.exports = router;