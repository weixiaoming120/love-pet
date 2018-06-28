import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http} from "@angular/http";
// import { App } from 'ionic-angular/components/app/app'; 
import { AboutPage } from '../about/about';
@IonicPage()
@Component({
  selector: 'page-addhealre',
  templateUrl: 'addhealre.html',
})
export class AddhealrePage {
  myDate:string;
  food:string;
  act:string;
  baba:string;
  someth:string;
  username=localStorage.getItem('username');
  petname=localStorage.getItem('petname');
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,private event: Events,public http:Http,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddhealrePage');
  }

  presentAlert1() {
    let alert = this.alertCtrl.create({
      title: '发布成功',
      buttons: ['OK']
    });
    alert.present();
  }
  presentAlert3() {
    let alert = this.alertCtrl.create({
      title: '发布错误',
      subTitle: '请重新发布',
      buttons: ['OK']
    });
    alert.present();
  }
  addsubmit(){
    this.http.get('http://192.168.110.1:3000/petrecordAdd?username='+this.username+'&petname='+this.petname+'&addtime='+this.myDate+'&food='+this.food+'&activity='+this.act+'&defecationnumber='+this.baba+'&other='+this.someth).subscribe(data=>{
      console.log(data);
      // this.navCtrl.push(AboutPage,this.navParams);
      if(data['_body']==1){
        this.presentAlert1();
      } else {
        this.presentAlert3();
      }
    });
  }
  eatfood(){
    let alert = this.alertCtrl.create({
      title: '小宝贝今天吃了什么？',
      inputs: [{        
          placeholder: '狗粮/猫粮'
        }],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            this.food=data[0];
            console.log(this.food);
          }
        }
      ]
    });
    alert.present();
  }
  active() {
    let alert = this.alertCtrl.create({
      title: '小宝贝今天运动了吗？',
      inputs: [{        
          placeholder: '跑步/散步'
        }],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            this.act=data[0];
            console.log(this.act);
          }
        }
      ]
    });
    alert.present();
  }
  showCheckbox() {
    let alert =this.alertCtrl.create();
    alert.setTitle('今天的排便次数？');
    alert.addInput({type:'radio',label:'一次',value:'一次'});
    alert.addInput({type:'radio',label:'两次',value:'两次'});
    alert.addInput({type:'radio',label:'三次',value:'三次'});
    alert.addInput({type:'radio',label:'四次',value:'四次'});
    alert.addInput({type:'radio',label:'五次：或许小宝贝生病了',value:'五次：或许小宝贝生病了'});
    alert.addInput({type:'radio',label:'零次：或许小宝贝生病了',value:'零次：或许小宝贝生病了'});
    alert.addButton('取消');
    alert.addButton({text:'确定',handler: data => {
    console.log('Checkbox data:', data);
    // this.testCheckboxOpen = false;
    // this.testCheckboxResult = data;
    this.baba=data;
    console.log(this.baba);
    }});
    alert.present();
  }
  showelse() {
    let alert = this.alertCtrl.create({
      title: '我还想说...',
      inputs: [{        
          placeholder: 'ennn...'
        }],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            this.someth=data[0];
            console.log(this.someth);
          }
        }
      ]
    });
    alert.present();
  }

}
