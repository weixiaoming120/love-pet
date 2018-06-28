// var createError = require('http-errors');
var express = require('express');
var static = require('express-static');
var mysql = require('mysql');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var consolidate = require('consolidate');
var expressRoute = require('express-route');
var logger = require('morgan');

var multer = require('multer');
var multerObj = multer({dest:'./public/upload'});


//前端接口
// var indexRouter = require('./routes/user/index');
var usersRouter = require('./routes/user/users');
var loginRouter = require('./routes/user/login');
var registerRouter=require('./routes/user/register');
var petshopRouter=require('./routes/user/petshop');
var petlistRouter=require('./routes/user/petlist');
var petlistAddRouter=require('./routes/user/petlistAdd');
var petmessageRouter=require('./routes/user/petmessage');
var petmessageAddRouter=require('./routes/user/petmessageAdd');
var articalRouter=require('./routes/user/artical');
var vaccineAddRouter=require('./routes/user/vaccineAdd');
var vaccineRouter=require('./routes/user/vaccine');
var pethealthAddRouter=require('./routes/user/pethealthAdd');
var pethealthRouter=require('./routes/user/pethealth');
var petrecordAddRouter=require('./routes/user/petrecordAdd');
var petrecordRouter=require('./routes/user/petrecord');
var publishAddRouter=require('./routes/user/publishAdd');
var publishRouter=require('./routes/user/publish');
var imgRouter=require('./routes/user/img');
var feedbackAddRouter=require('./routes/user/feedbackAdd');
var imguserRouter=require('./routes/user/imguser');
var imgpetRouter=require('./routes/user/imgpet');
var articalcollectRouter=require('./routes/user/articalcollect');
var addpetimgRouter=require('./routes/user/addpetimg');
var app = express();
app.listen(8083);


//1.获取请求数据
app.use(bodyParser.urlencoded());
app.use(multerObj.any());
//2.cookie/session
app.use(cookieParser());
(function(){
    var keys=[];
    for(var i=0;i<10000;i++){
        keys[i]='a_'+Math.random();
    }
    app.use(cookieSession({
        name: 'sess_id',
        keys:keys,
        maxAge:50*60*1000 //2min
    }));
})();

//3.模板
// view engine setup
app.engine('html',consolidate.ejs);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','html');



// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//4.route
//'/admin/'浏览器的网址后面加上admin
app.use('/admin/',require('./routes/admin/index.js')());
//5.defalte:static
// app.use(static('./public'));


app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/petshop',petshopRouter);
app.use('/petlist',petlistRouter);
app.use('/petlistAdd',petlistAddRouter);
app.use('/petmessage',petmessageRouter);
app.use('/petmessageAdd',petmessageAddRouter);
app.use('/artical',articalRouter);
app.use('/vaccineAdd',vaccineAddRouter);
app.use('/vaccine',vaccineRouter);
app.use('/pethealthAdd',pethealthAddRouter);
app.use('/pethealth',pethealthRouter);
app.use('/petrecordAdd',petrecordAddRouter);
app.use('/petrecord',petrecordRouter);
app.use('/publishAdd',publishAddRouter);
app.use('/publish',publishRouter);
app.use('/feedbackAdd',feedbackAddRouter);
app.use('/img',imgRouter);
app.use('/imguser',imguserRouter);
app.use('/imgpet',imgpetRouter);
app.use('/articalcollect',articalcollectRouter);
app.use('/addpetimg',addpetimgRouter);
//catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// //error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
