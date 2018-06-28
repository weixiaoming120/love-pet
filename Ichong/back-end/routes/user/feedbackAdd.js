var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
var FeedbackR = require('../../db/feedback-recruit');

router.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var username=req.query.username;
    var state= req.query.state;
    var phonenumber = req.query.phonenumber; 
    var email = req.query.email;   
    var feedback_type = req.query.feedback_type;    
   
 
    var newFeedback = new FeedbackR({
      username: username,
      phonenumber:phonenumber,
      state:state,
      email:email,
      feedback_type:feedback_type
    });
   
    //向数据库存储数据
    if(newFeedback.username!== 'undefined'&&newFeedback.feedback_type!=='undefined'){
        newFeedback.save({username:newFeedback.username,state:newFeedback.state,feedback_type:newFeedback.feedback_type,phonenumber:newFeedback.phonenumber,email:newFeedback.email},function(err,results){    
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