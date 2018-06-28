var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
var PetrecordR = require('../../db/petrecord-recruit');

router.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var username=req.query.username;
    var petname=req.query.petname;
    var addtime=req.query.addtime;
    var food = req.query.food;
    var activity = req.query.activity;
    var defecationnumber = req.query.defecationnumber;
    var other = req.query.other;  
   
    console.log("username:"+username);
    console.log('petname'+petname);
    console.log('addtime'+addtime);
    console.log('food'+food);
    console.log('activity'+activity);
    console.log('defecationnumber'+defecationnumber);
    console.log('other'+other);  
    
    var newPetrecord = new PetrecordR({
      username:username,
      petname:petname,
      addtime:addtime,
      food :food,
      activity :activity,
      defecationnumber :defecationnumber,
      other :other 
    });
    
  
    //向数据库存储数据
    if(newPetrecord.addtime!== 'undefined'&&newPetrecord.food!=='undefined'&&newPetrecord.activity!=='undefined'&&newPetrecord.defecationnumber!=='undefined'){
        newPetrecord.save({username:newPetrecord.username,petname:newPetrecord.petname,addtime:newPetrecord.addtime,food:newPetrecord.food,activity:newPetrecord.activity,defecationnumber:newPetrecord.defecationnumber,other:newPetrecord.other},function(err,results){
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