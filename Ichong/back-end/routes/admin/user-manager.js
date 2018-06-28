var express = require('express');

var  mysql = require('mysql');

var db = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '15097397147*',
    database: 'ichong'
});

var  pathLib = require('path');
var fs = require('fs');

module.exports=function(){
    var router = express.Router();

    router.get('/',function(req,res){
        switch(req.query.act){
            case 'del':
            //！！！！！！！！！
                db.query(`select * from login where  
                id=${req.query.id}`,(err,data)=>{
                    if(err){
                        res.status(500).send('数据库错误1'+err).end();
                    }else{
                        if(data.length==0){
                            res.status(404).send('没有这条数据2'+err).end();
                        }else{
                //!!!!!!!!!!!
                            fs.unlink('public/upload/'+data[0].pic,(err)=>{
                                if(err){
                                    res.status(500).send('文件操作失败3'+err).end();
                                }else{
                        //!!!!!!!!!!
                                    db.query(`delete from login where
                                    id=${req.query.id}`,(err,data)=>{
                                        if(err){
                                            res.status(500).send('数据库错误4'+err).end();
                                        }else{
                                //!!!!!!!!!!!
                                            res.redirect('/admin/user-manager');
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
        
            break;
            case 'mod':
                db.query(`select * from login where
                id =  ${req.query.id}`,(err,data)=>{
                    if(err){
                        res.status(500).send('数据库错误'+err).end();
                    }else if(data.length==0){
                        res.status(404).send('没有'+err).end();
                    }else{
                        db.query(`select * from login`,(err,user_manager)=>{
                            if(err){
                                req.status(500).send('数据库错误，错误信息：'+err).end();
                            }else{
                                res.render('admin/user-manager.ejs',{user_manager,mod_data:data[0]});
                            }
                        });
                    }
                });
            break;
            default:
            db.query(`select * from login`,(err,user_manager)=>{
                if(err){
                    req.status(500).send('数据库错误，错误信息：'+err).end();
                }else{
                    res.render('admin/user-manager.ejs',{user_manager});
                }
            });
            break;
        }
      
    });

    router.post('/',(req,res)=>{
       //！！！！！！！！！！！ 
        var id = req.body.id;
        var href = req.body.pic;
        var username = req.body.username;
        var gender = req.body.gender;
        var telephone = req.body.telephone;
        var password = req.body.password;
        var email = req.body.email;
        var introduction = req.body.introduction;

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
                    res.status(500).send('文件错误，错误原因：'+err).end();
                }else{
                    if(req.body.mod_id){    //修改
                        //先删除老的
                        //!!!!!!!!!!!!!!
                        db.query(`select * from login where
                        id=${req.body.mod_id}`,(err,data)=>{
                            if(err){
                                console.error(err);
                                res.status(500).send('数据库错误6'+err).end();
                            }else if(data.length==0){
                                res.status(404).send('老文件无法找到8'+err).end();
                            
                            }else{
                                fs.unlink('public/upload/'+data[0].pic,(err)=>{
                                    if(err){
                                        res.status(500).send('文件操作失败7'+err).end();
                                    }else{
                                        //!!!!!!!!!!!!!!!!!!!!!!
                                        db.query(`update login set \
                                        id = '${id}',username='${username}',gender='${gender}',telephone = '${telephone}',password='${password}',email='${email}',introduction='${introduction}' \
                                        pic='${newFileName}' \
                                        where id = ${req.body.mod_id}`,(err)=>{
                                            if(err){
                                                console.error(err);
                                                res.status(500).send('数据库错误9'+err).end();
                                            }else{
                                    //!!!!!!!!!!!!!!!!!!!!!!
                                                res.redirect('/admin/user-manager');
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }else{      //添加  
                        
                        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            db.query(`insert into login (id, pic,username,gender,telephone,password,email,introduction)
                            values('${id}','${newFileName}','${username}','${gender}','${telephone}','${password}','${email}','${introduction}')`,(err,data)=>{
                            if(err){
                                console.error(err);
                                res.status(500).send('数据库错误10'+err).end();
                            }else{
                            //!!!!!!!!!!!!!!!!!
                                res.redirect('/admin/user-manager');
                            }
                        });
                    } 
                }
            });
        }else{
            if(req.body.mod_id){    //修改
                    //直接改
            //!!!!!!!!!!!!!!!!!!!
                db.query(`update login set \
                 id = ${id},username='${username}',gender='${gender}',telephone = '${telephone}',password='${password}',email='${email}',introduction='${introduction}' \
                where id = ${req.body.mod_id}`,(err)=>{
                    if(err){
                        console.error(err);
                        res.status(500).send('数据库错误11'+err).end();
                    }else{
                //!!!!!!!!!!!!!!!!!
                        res.redirect('/admin/user-manager');
                    }
                });
            }else{      //添加   
            //!!!!!!!!!!!!!!!!!!!!!!!! 
                        db.query(`insert into login (id, pic,username,gender,telephone,password,email,introduction)
                        values('${id}','${newFileName}','${username}','${gender}','${telephone}','${password}'','${email}'','${introduction}')`,(err,data)=>{
                        if(err){
                            console.error(err);
                            res.status(500).send('数据库错误12'+err).end();
                        }else{
            //!!!!!!!!!!!!!!!!!!!
                            res.redirect('/admin/user-manager');
                        }
                    });
                }               
            }           
    });
    return router;
};

