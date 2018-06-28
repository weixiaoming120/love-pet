var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
var PetR = require('../../db/petlist-recruit');

router.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var id=req.query.id;
    // var petimage=req.query.picurl;
    var petname=req.query.petname;
    // var petimage=req.query.petimage;
    // var status= req.query.status;
    var phone = req.query.phone; 
    var address = req.query.address;   
    var petinformation = req.query.petinformation;    
   
    console.log('id:'+id);
    console.log('petname:'+petname);
    console.log('phone:'+phone);
    console.log('address:'+address);
    // console.log('petimage:'+petimage);
    console.log('petinformation:'+petinformation);
    
    var newPet = new PetR({
      id:id,
      // petimage:petimage,
      petname: petname,
      // petimage: petimage,
      phone:phone,
      // status:status,
      address:address,
      petinformation:petinformation
    });
    // console.log('param1:'+newPet.status);
    console.log('petname:'+newPet.petname);
    console.log('phone:'+newPet.phone);
    console.log('address:'+newPet.address);
    // console.log('petimage:'+newPet.petimage);
    console.log('petinformation:'+newPet.petinformation);
  
    //向数据库存储数据
  //   if(newPet.petname!== 'undefined'&&newPet.phone!=='undefined'&&newPet.address!== 'undefined'&&newPet.petinformation!=='undefined'){
  //       newPet.save({petname:newPet.petname,phone:newPet.phone,address:newPet.address,petinformation:newPet.petinformation},function(err,results){
          
  //         if(err){
  //           res.locals.error = err;
  //           return;
  //         }
  //       })
  //       //返回响应数据
  //       res.send('1');
  //       console.log('发布成功');
  //     }
  //     else{
  //       res.send('2');
  //     }
  // });    
   newPet.updateData(newPet.id,newPet,function(err,results){
            res.send(results);
    });
});  
module.exports = router;