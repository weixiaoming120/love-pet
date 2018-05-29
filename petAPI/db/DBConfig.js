module.exports =
 { 
     name:'pet', 
     mysql: {   
              host: '127.0.0.1',     
              user: 'wangzibing',   
              password: 'rootroot',  
              database:'pet'// 前面建的user表位于这个数据库中  
      },
      User:function User(user){
      	this.username=user.username;
      	this.password=user.password;
      }

 };
// module.exports = {
//     name:'people',

//     pool:{
//         host     : '127.0.0.1',
//         user     : 'root',
//         password : '123456',
//         database : 'people'
//     },

    
//     User:function User(user){
//         this.username = user.username;
//         this.userpass = user.userpass;
//     }
// }