var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
var PetR = require('../../db/petmessage-recruit');

router.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var petid=req.query.petid;
    var petname=req.query.petname;
    var petsex = req.query.petsex; 
    var petkind = req.query.petkind;   
    var petdate = req.query.petdate;    
    console.log('petid:'+petid);
    console.log('petname:'+petname);
    console.log('petsex:'+petsex);
    console.log('petkind:'+petkind);
    console.log('petdate:'+petdate);
    
    var newPet = new PetR({
      petid:petid,
      petname: petname,
      petsex:petsex,
      petkind:petkind,
      petdate:petdate
    });
  
    //向数据库存储数据
    newPet.updateData(newPet.petid,newPet,function(err,results){
            res.send(results);
    });
  });     
module.exports = router;