var express = require('express');

var mysql = require('mysql');

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
                db.query(`select * from baby_healthmanage_table where  
                id=${req.query.id}`,(err,data)=>{
                    if(err){
                        res.status(500).send('数据库错误11'+err).end();
                    }else{
                        if(data.length==0){
                            res.status(404).send('没有这条数据22'+err).end();
                        }else{
                //!!!!!!!!!!!
                            fs.unlink('public/upload/'+data[0].href,(err)=>{
                                if(err){
                                    res.status(500).send('文件操作失败33'+err).end();
                                }else{
                        //!!!!!!!!!!
                                    db.query(`delete from baby_healthmanage_table where
                                    id=${req.query.id}`,(err,data)=>{
                                        if(err){
                                            res.status(500).send('数据库错误44'+err).end();
                                        }else{
                                //!!!!!!!!!!!
                                            res.redirect('/admin/babyhealth-manager');
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
        
            break;
            case 'mod':
            console.log("3");
                db.query(`select * from baby_healthmanage_table where
                id =  ${req.query.id}`,(err,data)=>{
                    if(err){
                        res.status(500).send('数据库错误55'+err).end();
                    }else if(data.length==0){
                        res.status(404).send('没有'+err).end();
                    }else{
                        console.log("4");
                        db.query(`select * from baby_healthmanage_table`,(err,babyhealth_manager)=>{
                            if(err){
                                req.status(500).send('数据库错误66，错误信息：'+err).end();
                            }else{
                                res.render('admin/babyhealth-manager.ejs',{babyhealth_manager,mod_data:data[0]});
                            }
                        });
                    }
                });
            break;
            default:

            console.log("5");
            db.query(`select * from baby_healthmanage_table`,(err,babyhealth_manager)=>{
                if(err){
                    req.status(500).send('数据库错误77，错误信息：'+err).end();
                }else{
                    res.render('admin/babyhealth-manager.ejs',{babyhealth_manager});
                }
            });
            break;
        }
      
    });

    router.post('/',(req,res)=>{
       //！！！！！！！！！！！ 
        var id = req.body.id;
        var href = req.body.href;
        var userid = req.body.userid;
        var babyname = req.body.babyname;
        var height = req.body.height;
        var weight = req.body.weight;

        var age = req.body.age  ;
        var bodytype = req.body.bodytype;
        var food = req.body.food;
        var activity = req.body.activity;
        var defecationnumber = req.body.defecationnumber;
        var other = req.body.other;

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
                    res.status(500).send('文件错误，错误原因88：'+err).end();
                }else{
                    if(req.body.mod_id){    //修改
                        //先删除老的
                        //!!!!!!!!!!!!!!
                        console.log("6");
                        db.query(`select * from baby_healthmanage_table where
                        id=${req.body.mod_id}`,(err,data)=>{
                            if(err){
                                console.error(err);
                                res.status(500).send('数据库错误99'+err).end();
                            }else if(data.length==0){
                                res.status(404).send('老文件无法找到00'+err).end();
                            
                            }else{
                                fs.unlink('public/upload/'+data[0].href,(err)=>{
                                    if(err){
                                        res.status(500).send('文件操作失败01'+err).end();
                                    }else{
                                        //!!!!!!!!!!!!!!!!!!!!!!                         
                                        db.query(`update baby_healthmanage_table set \
                                        id = '${id}',userid='${userid}',babyname='${babyname}',height = '${height}',weight='${weight}',age='${age}',bodytype='${bodytype}',food='${food}',activity='${activity}',defecationnumber='${defecationnumber}',other='${other}' \
                                        href='${newFileName}' \
                                        where id = ${req.body.mod_id}`,(err)=>{
                                            if(err){
                                                console.error(err);
                                                res.status(500).send('数据库错误02'+err).end();
                                            }else{
                                    //!!!!!!!!!!!!!!!!!!!!!!
                                                res.redirect('/admin/babyhealth-manager');
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }else{      //添加  
                            db.query(`insert into baby_healthmanage_table (id, href,userid,babyname,height,weight,age,bodytype,food,activity,defecationnumber,other) \
                            values('${id}','${newFileName}','${userid}','${babyname}','${height}','${weight}','${age}','${bodytype}','${food}','${activity}','${defecationnumber}','${other}')`,(err,data)=>{
                            if(err){
                                console.error(err);
                                res.status(500).send('数据库错误03'+err).end();
                            }else{
                            //!!!!!!!!!!!!!!!!!
                                res.redirect('/admin/babyhealth-manager');
                            }
                        });
                    } 
                }
            });
        }else{
            if(req.body.mod_id){    //修改
                    //直接改
            //!!!!!!!!!!!!!!!!!!!
            console.log("9");
                db.query(`update baby_healthmanage_table set \
                id = '${id}',userid='${userid}',babyname='${babyname}',height = '${height}',weight='${weight}',age='${age}',bodytype='${bodytype}',food='${food}',activity='${activity}',defecationnumber='${defecationnumber}',other='${other}' \
                where id = ${req.body.mod_id}`,(err)=>{
                    if(err){
                        console.error(err);
                        res.status(500).send('数据库错误04'+err).end();
                    }else{
                //!!!!!!!!!!!!!!!!!
                        res.redirect('/admin/babyhealth-manager');
                    }
                });
            }else{      //添加   
            //!!!!!!!!!!!!!!!!!!!!!!!! 
            console.log("10");
                        db.query(`insert into baby_healthmanage_table (id, href,userid,babyname,height,weight,age,bodytype,food,activity,defecationnumber,other)
                        values('${id}','${newFileName}','${userid}','${babyname}','${height}','${weight}','${age}','${bodytype}','${food}','${activity}','${defecationnumber}','${other}'`,(err,data)=>{
                        if(err){
                            console.error(err);
                            res.status(500).send('数据库错误05'+err).end();
                        }else{
            //!!!!!!!!!!!!!!!!!!!
                            res.redirect('/admin/babyhealth-manager');
                        }
                    });
                }               
            }           
    });
    return router;
};

