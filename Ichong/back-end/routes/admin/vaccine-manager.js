var express = require('express');

var mysql = require('mysql');

var db = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '15097397147*',
    database: 'ichong'
});

module.exports = function(){
    var router = express.Router();

    router.get('/',(req,res)=>{
        switch(req.query.act){
            //添加数据时执行
            case'add':
            db.query(`insert into vaccine (username,petname,vaccinename,petage,status)
                value(${username}','${petname}','${vaccinename}','${petage}','${status}')`,(err,data)=>{
                    if(err){
                        console.error(err);
                        res.status(500).send('数据库错误1'+err).end();
                    }else{
                        res.redirect('/admin/vaccine-manager');

                    }
                });
             //修改数据时执行
            case 'mod':
                db.query(`select * from vaccine where vaccineid='${req.query.vaccineid}'`,(err,data)=>{
                    if(err){
                        res.status(500).send('数据库错误11'+err).end();
                    }else if(data.length==0){
                        res.status(404).send('数据无法找到404'+err).end();   
                    }else{
                        db.query(`select * from vaccine `,(err,vaccine_manager)=>{
                            if(err){
                                res.status(500).send('数据库错误111'+err).end();
                            }else{
                                 res.render('admin/vaccine-manager.ejs',{vaccine_manager,mod_data: data[0]});
                            }
                        });
                    }
                });
                break;
            //删除数据时执行
            case 'del':
                db.query(`delete from vaccine where vaccineid='${req.query.vaccineid}'`,(err,data)=>{
                    if(err){
                        console.error(err);
                        res.status(500).send('删除数据库错误'+err).end();
                    }else{
                        res.redirect('/admin/vaccine-manager');
                }
            });
            break;
            default:
            db.query(`select * from vaccine `,(err,vaccine_manager)=>{
                if(err){
                    res.status(500).send('数据库错误111111'+err).end();
                }else{
                    res.render('admin/vaccine-manager.ejs',{vaccine_manager});
                }
            });
            break;
        }
    });
    //添加数据
    router.post('/',(req,res)=>{
       
        var username=req.body.username;
        var petname=req.body.petname;
        var vaccinename=req.body.vaccinename;
        var petage=req.body.petage;
        var status=req.body.status;

        if(!username || !petname || !vaccinename || !petage || !status){
            res.status(400).send('arg error'+ err).end();
        }else{

            if(req.body.mod_id){
                //修改
                db.query(`update vaccine set 
                username='${req.body.username}',petname='${req.body.petname}',vaccinename='${req.body.vaccinename}',petage='${req.body.petage}',status='${req.body.status}' 
                where vaccineid = '${req.body.mod_id}' `,(err,data)=>{
                    if(err){
                        res.status(500).send('数据库错误222'+err).end();
                    }else{
                        res.redirect('/admin/vaccine-manager');

                    }
                });
            }else{
                //添加
                    db.query(`insert into vaccine (username,petname,vaccinename,petage,status)
                value('${username}','${petname}','${vaccinename}','${petage}','${status}')`,(err,data)=>{
                    if(err){
                        console.error(err);
                        res.status(500).send('数据库错误2222'+err).end();
                    }else{
                        res.redirect('/admin/vaccine-manager');

                    }

                });
            }   
        }
    });
    
    return router;
}