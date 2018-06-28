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
                db.query(`select * from adopt_manage_table where  
                id=${req.query.id}`,(err,data)=>{
                    if(err){
                        res.status(500).send('数据库错误'+err).end();
                    }else{
                        if(data.length==0){
                            res.status(404).send('没有这条数据'+err).end();
                        }else{
                //!!!!!!!!!!!
                            fs.unlink('public/upload/'+data[0].href,(err)=>{
                                if(err){
                                    res.status(500).send('文件操作失败'+err).end();
                                }else{
                        //!!!!!!!!!!
                                    db.query(`delete from adopt_manage_table where
                                    id=${req.query.id}`,(err,data)=>{
                                        if(err){
                                            res.status(500).send('数据库错误'+err).end();
                                        }else{
                                //!!!!!!!!!!!
                                            res.redirect('/admin/adopt-manager');
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
        
            break;
            case 'mod':
                db.query(`select * from adopt_manage_table where
                id =  ${req.query.id}`,(err,data)=>{
                    if(err){
                        res.status(500).send('数据库错误'+err).end();
                    }else if(data.length==0){
                        res.status(404).send('没有'+err).end();
                    }else{
                        db.query(`select * from adopt_manage_table`,(err,adopt_manager)=>{
                            if(err){
                                req.status(500).send('数据库错误，错误信息：'+err).end();
                            }else{
                                res.render('admin/adopt-manager.ejs',{adopt_manager,mod_data:data[0]});
                            }
                        });
                    }
                });
            break;
            default:
            db.query(`select * from adopt_manage_table`,(err,adopt_manager)=>{
                if(err){
                    req.status(500).send('数据库错误，错误信息：'+err).end();
                }else{
                    res.render('admin/adopt-manager.ejs',{adopt_manager});
                }
            });
            break;
        }
      
    });

    router.post('/',(req,res)=>{
       //！！！！！！！！！！！ 
       var  id=req.body.id;
       var  href=req.body.href;
       var  user_name=req.body.user_name;
       var  pet_name=req.body.pet_name;
       var  address=req.body.address;
       var  phone=req.body.phone;
       var  petinformation=req.body.petinformation;

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
                        db.query(`select * from adopt_manage_table where
                        id=${req.body.mod_id}`,(err,data)=>{
                            if(err){
                                console.error(err);
                                res.status(500).send('数据库错误'+err).end();
                            }else if(data.length==0){
                                res.status(404).send('老文件无法找到'+err).end();
                            
                            }else{
                                fs.unlink('public/upload/'+data[0].href,(err)=>{
                                    if(err){
                                        res.status(500).send('文件操作失败'+err).end();
                                    }else{
                                        //!!!!!!!!!!!!!!!!!!!!!!
                                        db.query(`update adopt_manage_table set \
                                        id = '${id}',user_name='${user_name}',pet_name='${pet_name}',address = '${address}',phone='${phone}',petinformation='${petinformation}' \
                                        href='${newFileName}' \
                                        where id = ${req.body.mod_id}`,(err)=>{
                                            if(err){
                                                console.error(err);
                                                res.status(500).send('数据库错误'+err).end();
                                            }else{
                                    //!!!!!!!!!!!!!!!!!!!!!!
                                                res.redirect('/admin/adopt-manager');
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }else{      //添加  
                        
                        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            db.query(`insert into adopt_manage_table (id, href,user_name,pet_name,address,phone,petinformation)
                            values('${id}','${newFileName}','${user_name}','${pet_name}','${address}','${phone}','${petinformation}')`,(err,data)=>{
                            if(err){
                                console.error(err);
                                res.status(500).send('数据库错误'+err).end();
                            }else{
                            //!!!!!!!!!!!!!!!!!
                                res.redirect('/admin/adopt-manager');
                            }
                        });
                    } 
                }
            });
        }else{
            if(req.body.mod_id){    //修改
                    //直接改
            //!!!!!!!!!!!!!!!!!!!
                db.query(`update adopt_manage_table set \
                 id = ${id},user_name='${user_name}',pet_name='${pet_name}',address = '${address}',phone='${phone}',petinformation='${petinformation}' \
                where id = ${req.body.mod_id}`,(err)=>{
                    if(err){
                        console.error(err);
                        res.status(500).send('数据库错误'+err).end();
                    }else{
                //!!!!!!!!!!!!!!!!!
                        res.redirect('/admin/adopt-manager');
                    }
                });
            }else{      //添加   
            //!!!!!!!!!!!!!!!!!!!!!!!! 
                        db.query(`insert into adopt_manage_table (id, href,user_name,pet_name,address,phone,petinformation)
                        values('${id}','${newFileName}','${user_name}','${pet_name}','${address}','${phone}','${petinformation}')`,(err,data)=>{
                        if(err){
                            console.error(err);
                            res.status(500).send('数据库错误'+err).end();
                        }else{
            //!!!!!!!!!!!!!!!!!!!
                            res.redirect('/admin/adopt-manager');
                        }
                    });
                }               
            }           
    });
    return router;
};

