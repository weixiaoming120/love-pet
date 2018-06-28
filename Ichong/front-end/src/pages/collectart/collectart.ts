import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelarticlePage } from '../helarticle/helarticle';
import { Http } from "@angular/http";

@IonicPage()
@Component({
  selector: 'page-collectart',
  templateUrl: 'collectart.html',
})
export class CollectartPage {
  items=[];
  title;content;pic;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectartPage');
    this.http.get('http://192.168.110.1:3000/articalcollect?articalstatus=true').subscribe( data=>{ 
      var message=JSON.parse(data['_body']);
      console.log(message);
      for(var i=0;i<message.length;i++){
        this.items[i]=message[i];
        this.items[i].pic='http://192.168.110.1:3000/upload/'+this.items[i].pic;
      }
    });   
  }
  helarticle(item){
    localStorage.setItem('choice',item.articalstatus);
    localStorage.setItem('articalid',item.articalid);
    console.log(item.articalstatus);
    console.log(item.articalid);
    this.navCtrl.push(HelarticlePage,{item:item});
  } 

}


