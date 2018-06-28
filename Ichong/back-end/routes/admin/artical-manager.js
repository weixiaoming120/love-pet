var express = require('express');
var mysql = require('mysql');

var db = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '15097397147*',
    database: 'ichong'
});
// var method = require('../../db/method.js');
// var fromidable = require('formidable');
// var Buffer = require('buffer').Buffer;
var pathLib = require('path');
var fs = require('fs');

module.exports=function(){
    var router = express.Router();

    router.get('/',function(req,res){
        switch(req.query.act){
            case 'del':
            //！！！！！！！！！
                db.query(`select * from artical where  
                articalid=${req.query.articalid}`,(err,data)=>{
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
                                    db.query(`delete from artical where
                                    articalid=${req.query.articalid}`,(err,data)=>{
                                        if(err){
                                            res.status(500).send('数据库错误4'+err).end();
                                        }else{
                                //!!!!!!!!!!!
                                            res.redirect('/admin/artical-manager');
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
        
            break;
            case 'mod':
                db.query(`select * from artical where
                articalid =  ${req.query.articalid}`,(err,data)=>{
                    if(err){
                        res.status(500).send('数据库错误5'+err).end();
                    }else if(data.length==0){
                        res.status(404).send('没有6'+err).end();
                    }else{
                        db.query(`select * from artical`,(err,artical_manager)=>{
                            if(err){
                                req.status(500).send('数据库错误，错误信息7：'+err).end();
                            }else{
                                res.render('admin/artical-manager.ejs',{artical_manager,mod_data:data[0]});
                            }
                        });
                    }
                });
            break;
            default:
            db.query(`select * from artical`,(err,artical_manager)=>{
                if(err){
                    req.status(500).send('数据库错误，错误信息8：'+err).end();
                }else{
                    res.render('admin/artical-manager.ejs',{artical_manager});
                }
            });
            break;
        }
      
    });

    router.post('/',(req,res)=>{
       //！！！！！！！！！！！ 
        var articalid = req.body.articalid;
        var pic = req.body.pic;
        var title = req.body.title;
        var content = req.body.content;
        var publishtime = req.body.publishtime;


        if(req.files[0]){
            
            
            var ext =pathLib.parse(req.files[0].originalname).ext;
            var oldPath = req.files[0].path; 
            var newPath = req.files[0].path + ext;
            var newFileName = req.files[0].filename+ext;
            // var savePath= 'http://192.168.110.1:3000/upload/'+newFileName;
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
                        db.query(`select * from artical where
                        articalid=${req.body.mod_idd}`,(err,data)=>{
                            if(err){
                                console.error(err);
                                res.status(500).send('数据库错误0'+err).end();
                            }else if(data.length==0){
                                res.status(404).send('老文件无法找到11'+err).end();
                            
                            }else{
                                fs.unlink('public/upload/'+data[0].pic,(err)=>{
                                    if(err){
                                        res.status(500).send('文件操作失败22'+err).end();
                                    }else{
                                        //!!!!!!!!!!!!!!!!!!!!!!
                                        db.query(`update artical set \
                                        articalid = '${articalid}',title='${title}',content='${content}',publishtime = '${publishtime}', \
                                        pic='${newFileName}' \
                                        where articalid = ${req.body.mod_idd}`,(err)=>{
                                            if(err){
                                                console.error(err);
                                                res.status(500).send('数据库错误33'+err).end();
                                            }else{
                                    //!!!!!!!!!!!!!!!!!!!!!!
                                                res.redirect('/admin/artical-manager');
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }else{      //添加  
                        
                        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            db.query(`insert into artical (articalid, pic,title,content,publishtime)
                            values('${articalid}','${newFileName}','${title}','${content}','${publishtime}') `,(err,data)=>{
                            if(err){
                                console.error(err);
                                res.status(500).send('数据库错误44'+err).end();
                            }else{
                            //!!!!!!!!!!!!!!!!!
                                res.redirect('/admin/artical-manager');
                            }
                        });
                    } 
                }
            });
        }else{
            if(req.body.mod_idd){    //修改
                    //直接改
            //!!!!!!!!!!!!!!!!!!!
                db.query(`update artical set \
                articalid = '${articalid}',title='${title}',content = '${content}',publishtime='${publishtime}' \
                where articalid = ${req.body.mod_idd} `,(err)=>{
                    // 
                    if(err){
                        console.error(err);
                        res.status(500).send('数据库错误55'+err).end();
                    }else{
                //!!!!!!!!!!!!!!!!!
                        res.redirect('/admin/artical-manager');
                    }
                });
            }else{      //添加   
            //!!!!!!!!!!!!!!!!!!!!!!!! 
                        db.query(`insert into artical (articalid, pic,title,content,publishtime)
                        values('${articalid}','${newFileName}','${title}','${content}',${publishtime})`,(err,data)=>{
                        if(err){
                            console.error(err);
                            res.status(500).send('数据库错误66'+err).end();
                        }else{
            //!!!!!!!!!!!!!!!!!!!
                            res.redirect('/admin/artical-manager');
                        }
                    });
                }               
            }           
    });
    return router;
};

