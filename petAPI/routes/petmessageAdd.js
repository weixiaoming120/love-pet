var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var PetR = require('../db/petmessage-recruit');

router.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var petname=req.query.petname;
    // var petimage=req.query.petimage;
    var petsex = req.query.petsex; 
    var petkind = req.query.petkind;   
    var petdate = req.query.petdate;    
   
    console.log('petname:'+petname);
    console.log('petsex:'+petsex);
    console.log('petkind:'+petkind);
    // console.log('petimage:'+petimage);
    console.log('petdate:'+petdate);
    
    var newPet = new PetR({
      petname: petname,
      // petimage: petimage,
      petsex:petsex,
      petkind:petkind,
      petdate:petdate
    });
  
    //向数据库存储数据
    if(newPet.petname!== 'undefined'&&newPet.petsex!=='undefined'&&newPet.petkind!== 'undefined'&&newPet.petdate!=='undefined'){
        newPet.save({petname:newPet.petname,petsex:newPet.petsex,petkind:newPet.petkind,petdate:newPet.petdate},function(err,results){
          
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