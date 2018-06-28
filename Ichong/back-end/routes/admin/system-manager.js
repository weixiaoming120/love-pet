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
            db.query(`insert into systemmanage_table (username, truename,sex,position,phonenumber,email)
                value('${username}','${truename}','${sex}','${position}','${phonenumber}','${email}')`,(err,data)=>{
                    if(err){
                        console.error(err);
                        res.status(500).send('数据库错误'+err).end();
                    }else{
                        res.redirect('/admin/system-manager');

                    }
                });
             //修改数据时执行
            case 'mod':
                db.query(`select * from systemmanage_table where id='${req.query.id}'`,(err,data)=>{
                    if(err){
                        res.status(500).send('数据库错误'+err).end();
                    }else if(data.length==0){
                        res.status(404).send('数据无法找到'+err).end();   
                    }else{
                        db.query(`select * from systemmanage_table `,(err,system_manager)=>{
                            if(err){
                                res.status(500).send('数据库错误'+err).end();
                            }else{
                                 res.render('admin/system-manager.ejs',{system_manager,mod_data: data[0]});
                            }
                        });
                    }
                });
                break;
            //删除数据时执行
            case 'del':
                db.query(`delete from systemmanage_table where id='${req.query.id}'`,(err,data)=>{
                    if(err){
                        res.status(500).send('数据库错误'+err).end();
                    }else{
                        res.redirect('/admin/system-manager');
                }
            });
            break;
            default:
            db.query(`select * from systemmanage_table `,(err,system_manager)=>{
                if(err){
                    res.status(500).send('数据库错误'+err).end();
                }else{
                    res.render('admin/system-manager.ejs',{system_manager});
                }
            });
            break;
        }
    });
    //添加数据
    router.post('/',(req,res)=>{
       
        var username = req.body.username;
        var truename = req.body.truename;
        var sex = req.body.sex;
        var position = req.body.position;
        var phonenumber = req.body.phonenumber;
        var email = req.body.email;

        if(!username || !truename || !sex || !position || !phonenumber || !email){
            res.status(400).send('arg error'+ err).end();
        }else{

            if(req.body.mod_id){
                //修改
                db.query(`update systemmanage_table set username='${req.body.username}',
                truename='${req.body.truename}',sex='${req.body.sex}',position='${req.body.position}',phonenumber='${req.body.phonenumber}',email='${req.body.email}' 
                where id = '${req.body.mod_id}' `,(err,data)=>{
                    if(err){
                        res.status(500).send('数据库错误'+err).end();
                    }else{
                        res.redirect('/admin/system-manager');

                    }
                });
            }else{
                //添加
                    db.query(`insert into systemmanage_table (username, truename,sex,position,phonenumber,email)
                value('${username}','${truename}','${sex}','${position}','${phonenumber}','${email}')`,(err,data)=>{
                    if(err){
                        console.error(err);
                        res.status(500).send('数据库错误'+err).end();
                    }else{
                        res.redirect('/admin/system-manager');

                    }

                });
            }   
        }
    });
    
    return router;
}