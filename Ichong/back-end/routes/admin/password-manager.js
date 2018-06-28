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

        //接收login页面的数据
        router.get('/',(req,res)=>{
            res.render('admin/password-manager.ejs',{});
        });

        router.post('/',(req,res)=>{

            console.log(req.body);

            var username = req.body.username;
            var password = req.body.password;
            var ps1 = req.body.ps1;
            var ps2 = req.body.ps2;

            //匹配数据库
            db.query(`select * from admin_table where username='${username}'`,(err,data)=>{
                if(err){
                    res.status(500).send(err).end();
                }else{
                    if(data.length==0){
                        res.status(400).send('您的用户名有误！').end();
                    }else{
                        if(data[0].password==password){                          
                            //两次新密码是否为空
                            if(ps1 || ps2 != ''){
                                if(ps1 != password){
                                    if(ps1 == ps2){
                                        db.query(`update admin_table set password = '${ps1}' where ID = ${data[0].ID}`,(err,data)=>{
                                            if(err){
                                                res.status(500).send('数据库错误11'+err).end();
                                            }else{
                                                // res.status(500).send('修改密码成功，即将返回登陆页面！'+err).end();
                                                res.redirect('/admin/login');
                                            }
                                        });
                                    }else{
                                        res.status(400).send('您两次输入的新密码不一致！'+err).end();
                                    }
                                
                                }else{
                                    res.status(400).send('您的新密码不能和旧密码一样！'+err).end();
                                }
                            }else{
                                res.status(400).send('您的新密码不能为空！'+err).end();
                            }
                        }else{
                            res.status(400).send('您的原始密码有误！'+err).end();
                        }
                    }
                }
            });
        });   
    return router;
}

