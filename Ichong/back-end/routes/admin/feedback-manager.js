var express=require('express');
var mysql=require('mysql');
var db = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '15097397147*',
    database: 'ichong'
});

module.exports=function(){
   var router = express.Router();

   router.get('/',(req,res)=>{
    //在get时获取反馈管理的数据
    switch(req.query.act){
        case 'mod':    
           //如果修改的话，得先把原始数据取出来
           db.query(`SELECT * FROM feedback_manage_table WHERE feedback_id=${req.query.feedback_id}`,(err,data)=>{
            if(err){
              console.error(err);
              res.status(500).send('原始数据读取失败').end();
            }else if(data.length==0){
                res.status(404).send('data not found').end();
            }else{
                db.query(`SELECT * FROM feedback_manage_table`, (err,feedback)=>{
                    if(err){
                      console.error(err);
                      res.status(500).send('database error').end();
                    }else{
                        console.log("把原始数据拿出来了");
                        res.render('admin/feedback-manager.ejs', {feedback,mod_data: data[0]});
                    }
                  });
            }
        });
           break;
        case 'del':
           db.query(`DELETE FROM feedback_manage_table WHERE feedback_id=${req.query.feedback_id}`,
           (err,data)=>{
             if(err){
                console.error(err);
                res.status(500).send('database error').end();
             }else{
                console.log("数据被删除了");
                res.redirect('/admin/feedback-manager');
             }
        });
           break;
        default:
            db.query(`SELECT * FROM feedback_manage_table`,(err,feedback)=>{
                if(err){
                console.error(err);
                res.status(500).send('database error').end();
                }else{
                    console.log("这是添加数据");
                    res.render('admin/feedback-manager.ejs',{feedback});
                }
            });
            break;      
        }        
 });
router.post('/',(req,res)=>{
    var feedback_id=req.body.feedback_id;
    var feedback_type=req.body.feedback_type;
    var state=req.body.state;
    var phonenumber=req.body.phonenumber;
    var email=req.body.email;
            
   
    if(!feedback_id || !feedback_type ||!state ||!phonenumber ||!email){
        //正则条件
        res.status(400).send('arg error').end();
     }else{
        if(req.body.mod_id){  //mod_id存在，是修改
             db.query(`UPDATE feedback_manage_table SET \
             feedback_id='${req.body.feedback_id}',feedback_type='${req.body.feedback_type}',state='${req.body.state}',\
             phonenumber='${req.body.phonenumber}',email='${req.body.email}'\
             WHERE feedback_id=${req.body.mod_id}`,
            (err,data)=>{
                if(err){
                    console.error(err);
                    res.status(500).send('修改数据库错误').end();
                }else{
                    res.redirect('/admin/feedback-manager');
                }
            });

        }else{      //mod_id不存在，是添加
            db.query(`INSERT INTO feedback_manage_table (feedback_id,feedback_type,state,phonenumber,email) VALUE ('${userID}','${feedback_type}','${state}','${phonenumber}','${email}')`,(err,data)=>{
                if(err){
                    console.error(err);
                    res.status(500).send('添加数据库错误').end();
                }else{  //添加成功了
                    console.log("数据添加成功了");
                    res.redirect('/admin/feedback-manager');//回到get,能看到render出的东西了
                }
            });
        }
     }
});
   
return router;

};