import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http} from "@angular/http";
/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  username=localStorage.getItem('username');
  phone=localStorage.getItem('phone');
  email=localStorage.getItem('email');
  information;
  list=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,private alertCtrl: AlertController) {
  }
  presentAlert1() {
    let alert = this.alertCtrl.create({
      title: '提交成功',
      buttons: ['OK']
    });
    alert.present();
  }
  presentAlert2() {
    let alert = this.alertCtrl.create({
      title: '提交失败',
      subTitle: '请重新输入',
      buttons: ['OK']
    });
    alert.present();
  }
  submit(){
     this.http.get('http://192.168.110.1:3000/login/get?username='+this.username).subscribe(data=>{
      console.log(data['_body']);
      this.list=JSON.parse(data['_body']);
      var telephone= this.list[0]['telephone'];
      var email= this.list[0]['email'];
      console.log(telephone,email);
      localStorage.setItem('phone',telephone);
      localStorage.setItem('email',email);
     
    });
    this.http.get('http://192.168.110.1:3000/feedbackAdd?username='+this.username+'&feedback_type='+this.information+'&state='+'未解决'+'&phonenumber='+this.phone+'&email='+this.email).subscribe(data=>{
      console.log(data['_body']);
      if(data['_body']==1){
        this.presentAlert1();
      }
      else {
        this.presentAlert2();
      }
    });
  } 
  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

}
