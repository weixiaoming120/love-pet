import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FindpswPage} from '../findpsw/findpsw';
import { RegisterPage } from '../register/register';
import { HomePage }from '../home/home';
import { App } from 'ionic-angular/components/app/app'; 
import { TabsPage} from '../tabs/tabs';

import { AlertController } from 'ionic-angular';
import { Http} from "@angular/http";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams , private app:App,public http:Http,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  user:string;
  password:string;

  presentAlert1() {
    let alert = this.alertCtrl.create({
      title: '用户名与密码不符',
      subTitle: '请重新输入',
      buttons: ['OK']
    });
    alert.present();
  }
  presentAlert2() {
    let alert = this.alertCtrl.create({
      title: '用户名不存在',
      subTitle: '请重新输入',
      buttons: ['OK']
    });
    alert.present();
  }
  
  navCtrl1(){
    this.http.get('http://127.0.0.1:3000/login?status=login&username='+this.user+'&password='+this.password).subscribe( data=>{ 
      console.log(data);
      if(data['_body']==1){
        localStorage.setItem("username",this.user);
        this.app.getRootNavs()[0].setRoot(TabsPage);
      }
      if(data['_body']==2)this.presentAlert1();
      if(data['_body']==3)this.presentAlert2();
    }); 
     
  }
  
  //跳转忘记密码页
  navCtrl2(){
    this.navCtrl.push(FindpswPage);
  }
  //跳转注册页
  navCtrl3(){
    this.navCtrl.push(RegisterPage);
  }

}
