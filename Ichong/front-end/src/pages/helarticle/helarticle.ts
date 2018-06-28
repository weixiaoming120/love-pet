import { Component } from '@angular/core';
import { NavController, NavParams, Modal } from 'ionic-angular';
import { Http } from "@angular/http";
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-helarticle',
  templateUrl: 'helarticle.html',
})
export class HelarticlePage {
  title;content;pic;articalstatus;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,private alertCtrl: AlertController) {
    this.title=navParams.get('item').title;
    this.content=navParams.get('item').content;
    this.pic=navParams.get('item').pic;
    
  }
  status:boolean;
  articalid=localStorage.getItem('articalid');
  choice=localStorage.getItem('choice');
 f;
  presentAlert1() {
    let alert = this.alertCtrl.create({
      title: '已收藏',
      buttons: ['OK']
    });
    alert.present();
  }
  presentAlert2() {
    let alert = this.alertCtrl.create({
      title: '已取消收藏',
      buttons: ['OK']
    });
    alert.present();
  }
  // collect1(){
  //   this.http.get('http://127.0.0.1:3000/articalcollect/collectchange?articalstatus='+this.f+'&articalid='+this.articalid).subscribe(data=>{      
  //         console.log(this.f);
  //         if(this.f=true){
  //            this.presentAlert1();
  //          }           
  //       });
  // }
collect(){
    if(this.f==false){
        this.f=true;
        console.log('star');  
        this.http.get('http://192.168.110.1:3000/articalcollect/collectchange?articalstatus='+'true'+'&articalid='+this.articalid).subscribe(data=>{      
          console.log(this.f);
          if(this.f=true){
             this.presentAlert1();
           }           
        });      
    }else{
      this.f=false;
      console.log('nostar');
      this.http.get('http://192.168.110.1:3000/articalcollect/collectchange?articalstatus='+'false'+'&articalid='+this.articalid).subscribe(data=>{      
          console.log(this.f);
          if(this.f=false){
             this.presentAlert2();
           }           
        });      
    }
  }
  ionViewDidLoad() { 
    console.log(this.choice);
    if(this.choice=='true'){
      this.f=true;
    }else{
      this.f=false;
    }
  }

}
