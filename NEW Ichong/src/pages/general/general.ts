import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController} from 'ionic-angular';
import { HelarticlePage } from '../helarticle/helarticle';
import { Http } from "@angular/http";
@IonicPage()
@Component({
  selector: 'page-general',
  templateUrl: 'general.html',
})
export class GeneralPage {
  list:number[]=[1,2,3,4];
  arr=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public modCtrl:ModalController) {
  }
  helarticle(item){
    // let articlepage = this.modCtrl.create('HelarticlePage',{articalid:this.arr[i].articalid});
    this.navCtrl.push('HelarticlePage',{item:item});
    // console.log(i);
   
    // articlepage.present();
  } 
  ionViewDidLoad() {
    console.log('ionViewDidLoad GeneralPage');
    this.http.get('http://127.0.0.1:3000/artical').subscribe( data=>{ 
        console.log(JSON.parse(data['_body']));
        this.list=JSON.parse(data['_body']);
   });
    
  
  }
  

}
