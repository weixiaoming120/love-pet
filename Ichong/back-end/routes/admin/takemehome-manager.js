var express = require('express');

var  mysql = require('mysql');

var db = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '15097397147*',
    database: 'ichong'
});

var pathLib = require('path');
var fs = require('fs');

module.exports=function(){
    var router = express.Router();

    router.get('/',function(req,res){
        switch(req.query.act){
            case 'del':
            //！！！！！！！！！
                db.query(`select * from takemehome where  
                id=${req.query.id}`,(err,data)=>{
                    if(err){
                        res.status(500).send('数据库错误1'+err).end();
                    }else{
                        if(data.length==0){
                            res.status(404).send('没有这条数据2'+err).end();
                        }else{
                //!!!!!!!!!!!
                            fs.unlink('public/upload/'+data[0].petimage,(err)=>{
                                if(err){
                                    res.status(500).send('文件操作失败3'+err).end();
                                }else{
                        //!!!!!!!!!!
                                    db.query(`delete from takemehome where
                                    id=${req.query.id}`,(err,data)=>{
                                        if(err){
                                            res.status(500).send('数据库错误4'+err).end();
                                        }else{
                                //!!!!!!!!!!!
                                            res.redirect('/admin/takemehome-manager');
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
        
            break;
            case 'mod':
                db.query(`select * from takemehome where
                id =  ${req.query.id}`,(err,data)=>{
                    if(err){
                        res.status(500).send('数据库错误5'+err).end();
                    }else if(data.length==0){
                        res.status(404).send('没有6'+err).end();
                    }else{
                        db.query(`select * from takemehome`,(err,takemehome_manager)=>{
                            if(err){
                                req.status(500).send('数据库错误，错误信息7：'+err).end();
                            }else{
                                res.render('admin/takemehome-manager.ejs',{takemehome_manager,mod_data:data[0]});
                            }
                        });
                    }
                });
            break;
            default:
            db.query(`select * from takemehome`,(err,takemehome_manager)=>{
                if(err){
                    req.status(500).send('数据库错误，错误信息8：'+err).end();
                }else{
                    res.render('admin/takemehome-manager.ejs',{takemehome_manager});
                }
            });
            break;
        }
      
    });

    router.post('/',(req,res)=>{
       //！！！！！！！！！！！ 
        var id = req.body.id;
        var petname = req.body.petname;
        var petimage = req.body.petimage;
        var address = req.body.address;
        var phone = req.body.phone;
        var petinformation = req.body.petinformation;


        if(req.files[0]){
            
            var ext =pathLib.parse(req.files[0].originalname).ext;
            var oldPath = req.files[0].path; 
            var newPath = req.files[0].path + ext;
            var newFileName = req.files[0].filename+ext;
        }else{
            var newFileName = null;
        }
        if(newFileName){
            fs.rename(oldPath,newPath,(err)=>{
                if(err){
                    res.status(500).send('文件错误，错误原因9：'+err).end();
                }else{
                    if(req.body.mod_idd){    //修改
                        //先删除老的
                        //!!!!!!!!!!!!!!
                        db.query(`select * from takemehome where
                        id=${req.body.mod_idd}`,(err,data)=>{
                            if(err){
                                console.error(err);
                                res.status(500).send('数据库错误0'+err).end();
                            }else if(data.length==0){
                                res.status(404).send('老文件无法找到11'+err).end();
                            
                            }else{
                                fs.unlink('public/upload/'+data[0].petimage,(err)=>{
                                    if(err){
                                        res.status(500).send('文件操作失败22'+err).end();
                                    }else{
                                        //!!!!!!!!!!!!!!!!!!!!!!
                                        db.query(`update takemehome set \
                                        id = '${id}',petname='${petname}',address='${address}',phone = '${phone}',petinformation = '${petinformation}', \
                                        petimage='${newFileName}' \
                                        where id = ${req.body.mod_idd}`,(err)=>{
                                            if(err){
                                                console.error(err);
                                                res.status(500).send('数据库错误33'+err).end();
                                            }else{
                                    //!!!!!!!!!!!!!!!!!!!!!!
                                                res.redirect('/admin/takemehome-manager');
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }else{      //添加  
                        
                        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            db.query(`insert into takemehome (id,petname, petimage,address,phone,petinformation)
                            values('${id}','${petname}','${newFileName}','${address}','${phone}','${petinformation}') `,(err,data)=>{
                            if(err){
                                console.error(err);
                                res.status(500).send('数据库错误44'+err).end();
                            }else{
                            //!!!!!!!!!!!!!!!!!
                                res.redirect('/admin/takemehome-manager');
                            }
                        });
                    } 
                }
            });
        }else{
            if(req.body.mod_idd){    //修改
                    //直接改
            //!!!!!!!!!!!!!!!!!!!
                db.query(`update takemehome set \
                id = '${id}',petimage='${newFileName}',petname='${petname}',address = '${address}',phone='${phone}', petinformation='${petinformation}'\
                where id = ${req.body.mod_idd} `,(err)=>{
                    // 
                    if(err){
                        console.error(err);
                        res.status(500).send('数据库错误55'+err).end();
                    }else{
                //!!!!!!!!!!!!!!!!!
                        res.redirect('/admin/takemehome-manager');
                    }
                });
            }else{      //添加   
            //!!!!!!!!!!!!!!!!!!!!!!!! 
                        db.query(`insert into takemehome (id,petname, petimage,address,phone,petinformation)
                        values('${id}','${petname}','${newFileName}','${address}','${phone}','${petinformation}')`,(err,data)=>{
                        if(err){
                            console.error(err);
                            res.status(500).send('数据库错误66'+err).end();
                        }else{
            //!!!!!!!!!!!!!!!!!!!
                            res.redirect('/admin/takemehome-manager');
                        }
                    });
                }               
            }           
    });
    return router;
};

