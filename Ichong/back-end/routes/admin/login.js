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
            res.render('admin/login.ejs',{});
        });

        router.post('/',(req,res)=>{

            console.log(req.body);

            var username = req.body.username;
            var password = req.body.password;

            //匹配数据库
            db.query(`select * from admin_table where username='${username}'`,(err,data)=>{
                if(err){
                    res.status(500).send(err).end();
                }else{
                    if(data.length==0){
                        res.status(400).send('您的用户名有误！').end();
                    }else{
                        if(data[0].password==password){
                            //成功,data[0].ID就是admin_table表里的 ID字段
                            req.session['admin_id'] = data[0].ID;
                            //跳转页面
                            res.redirect('/admin/');
                        }else{
                            res.status(400).send('您的密码有误！'+err).end();
                        }
                    }
                }
            });
        });   


    return router;
}

// router.post('/',(req,res)=>{

//     console.log(req.body);

//     var username = req.body.username;
//     var password = req.body.password;
//     var newpassword = req.body.newpassword;
//     var newpasswordagain = req.body.newpasswordagain;
//     //匹配数据库
//     db.query(`select * from admin_table where username='${username}'`,(err,data)=>{
//         if(err){
//             res.status(500).send(err).end();
//         }else{
//             if(data.length==0){
//                 res.status(400).send('您的用户名有误！').end();
//             }else{
//                 if(data[0].password==password){
//                     if(newpasswordagain != newpassword){
//                         res.status(400).send('您两次输入的密码不一样,请重新输入！').end();
//                     }else{
//                         db.query(`update admin_table set password = '${newpassword}' where ID = ${data[0].ID}`,(err,data)=>{
//                             if(err){
//                                  res.status(500).send('数据库错误11'+err).end();
//                             }else{
//                                 res.redirect('/admin/login');
//                             }
//                         });
//                      }
//                 }else{
//                     res.status(400).send('您的密码有误！'+err).end();
//                 }
//             }
//         }
//     });
// });   


//   router.post('/',(req,res)=>{

//     var username = req.body.username;
//     var oldpassword = req.body.oldpassword;
//     var newpassword = req.body.newpassword;
//     var newpasswordagain = req.body.newpasswordagain;

//     //匹配数据库
//     db.query(`select * from admin_table where username='${username}'`,(err,data)=>{
//         if(err){
//             res.status(500).send(err).end();
//         }else{
//             if(data.length==0){
//                 res.status(400).send('您的用户名有误！').end();
//             }else{
//                 if(data[0].password == oldpassword){
//                     res.status(400).send('您的密码zhengque！'+err).end();
//                 }else  if(data[0].password != newpassword){          
//                         res.status(400).send('您的旧密码与新密码不一样！'+err).end();            
//                 }else if(newpassword != newpasswordagain){                               
//                         res.status(400).send('您两次输入的新密码不一样！'+err).end();
//                  } else if(newpassword == newpasswordagain){                               
//                         res.status(400).send('新密码与旧密码不能一样！'+err).end();
//                 }else{
//                     db.query(`update admin_table set password = '${newpassword}' where ID = ${data[0].ID}`,(err,data)=>{
//                         if(err){
//                             res.status(500).send('数据库错误11'+err).end();
//                         }else{
//                             res.redirect('/admin/password-manager');
//                         }
//                     });
//                 }
//             }
//         }
//     });
// });   