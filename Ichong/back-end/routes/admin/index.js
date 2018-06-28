var express = require('express');
// const common = require('../libs/common');

module.exports = function(){
    var router = express.Router();
    
    //检查登录状态
    router.use((req,res,next)=>{
        if(!req.session['admin_id'] && req.url!='/login'){
            //没有登录
            res.redirect('/admin/login');
        }else {
            next();
        }
    });

     router.get('/',(req,res)=>{
        res.render('admin/index.ejs',{});
    });
   
    router.use('/login',require('./login')());
    router.use('/system-manager',require('./system-manager')());
    router.use('/user-manager',require('./user-manager')());
    router.use('/artical-manager',require('./artical-manager')());
    router.use('/babyhealth-manager',require('./babyhealth-manager')());
    router.use('/feedback-manager',require('./feedback-manager')());
    router.use('/adopt-manager',require('./adopt-manager')());
    router.use('/vaccine-manager',require('./vaccine-manager')());
    router.use('/fosterpet-manager',require('./fosterpet-manager')());
    router.use('/password-manager',require('./password-manager')());
    router.use('/takemehome-manager',require('./takemehome-manager')());




    // router.use('/user/users',require('./users')());
    // router.use('/user/login',require('./login')());
    // router.use('/user/register',require('./register')());
    // router.use('/user/petshop',require('./petshop')());
    // router.use('/user/petlist',require('./petlist')());  
    // router.use('/user/petlistAdd',require('./petlistAdd')());    
    // router.use('/user/petmessage',require('./petmessage')());
    // router.use('/user/petmessageAdd',require('./petmessageAdd')());  
    // router.use('/user/artical',require('./artical')());  
    // router.use('/user/vaccineAdd',require('./vaccineAdd')());    
    // router.use('/user/vaccine',require('./vaccine')());  
    // router.use('/user/pethealthAdd',require('./pethealthAdd')());    
    // router.use('/user/pethealth',require('./pethealth')());  
    // router.use('/user/petrecordAdd',require('./petrecordAdd')());
    // router.use('/user/petrecord',require('./petrecord')());  
    // router.use('/user/publishAdd',require('./publishAdd')());
    // router.use('/user/publish',require('./publish')());  
    // router.use('/user/img',require('./img')());
    // router.use('/user/feedbackAdd',require('./feedbackAdd')());  
    // router.use('/user/imguser',require('./imguser')());  
    // router.use('/user/imgpet',require('./imgpet')());    

    
    
    return router;
};