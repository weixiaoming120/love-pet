import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Http} from "@angular/http";
import { YimiaoPage} from'../yimiao/yimiao';
@IonicPage()
@Component({
  selector: 'page-addym',
  templateUrl: 'addym.html',
})
export class AddymPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public alertCtrl: AlertController) {
  }
  name:string;
  time:string;
  status:string;
  username=localStorage.getItem('username');
  petname=localStorage.getItem('petname');

  presentAlert1() {
    let alert = this.alertCtrl.create({
      title: '添加成功',
      buttons: ['OK']
    });
    alert.present();
  }
  presentAlert2() {
    let alert = this.alertCtrl.create({
      title: '填写不详细',
      subTitle: '请完善您的爱宠信息',
      buttons: ['OK']
    });
    alert.present();
  }
  presentAlert3() {
    let alert = this.alertCtrl.create({
      title: '添加错误',
      subTitle: '请重新添加',
      buttons: ['OK']
    });
    alert.present();
  }
  add(){
    console.log(this.username);
    this.http.get('http://192.168.110.1:3000/vaccineAdd?username='+this.username+'&petname=xx'+'&vaccinename='+this.name+'&petage='+this.time+'&status='+this.status).subscribe(data=>{
      console.log(data['_body']);
      if(data['_body']==1){
        this.presentAlert1();
        this.navCtrl.push(YimiaoPage,this.navParams);
      }
      else if(data['_body']==2){
        this.presentAlert2();
      }
      else {
        this.presentAlert3();
      }
    });
  } 
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddymPage');
  }

}
