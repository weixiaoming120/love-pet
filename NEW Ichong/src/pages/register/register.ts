import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AgreementPage } from '../agreement/agreement';
import { App } from 'ionic-angular/components/app/app'; 
import { TabsPage} from '../tabs/tabs';
import { LoginPage} from '../login/login';
import { AlertController } from 'ionic-angular';
import { Http} from "@angular/http";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  username:string;
  pwd:string;
  tel:string;
  pwd1:string;
  constructor(public navCtrl: NavController, public navParams: NavParams , private app:App,public http:Http,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  //agree
  agree:boolean;
    updateAgree(){
      console.log('Agree new state:'+this.agree);
    }
  favor(){
        this.navCtrl.push(AgreementPage);
    }


  presentAlert1() {
    let alert = this.alertCtrl.create({
      title: '用户名已存在',
      subTitle: '请重新输入',
      buttons: ['OK']
    });
    alert.present();
  }
  presentAlert2() {
    let alert = this.alertCtrl.create({
      title: '请阅读《I宠用户协议》',
      buttons: ['OK']
    });
    alert.present();
  }
  presentAlert3(){
    let alert = this.alertCtrl.create({
      title:'密码不一致',
      buttons:['OK']
    });
    alert.present();
  }
  presentAlert4(){
    let alert = this.alertCtrl.create({
      title:'所填内容不为空',
      buttons:['OK']
    });
    alert.present();
  }
  presentAlert5(){
    let alert = this.alertCtrl.create({
      title:'手机号格式不正确',
      buttons:['OK']
    });
    alert.present();
  }
    
  next(){
    let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if(this.username == null || this.tel == null || this.pwd == null || this.pwd1 == null){
      this.presentAlert4();
    } else if(this.pwd !==this.pwd1){
      this.presentAlert3();
    }else if(!myreg.test(this.tel)){
      this.presentAlert5();   
      return false;
    } 
    else if(this.agree !== true){
      this.presentAlert2();
    }
    else{
    this.http.get('http://127.0.0.1:3000/register?status=register&username='+this.username+'&password='+this.pwd+'&telephone='+this.tel).subscribe(data=>{
      console.log(data);
      
      if(data['_body']==1){       
        this.navCtrl.push(LoginPage);
        console.log('成功');
      }
      if(data['_body']==2)this.presentAlert1();
    });
  }
  }

}