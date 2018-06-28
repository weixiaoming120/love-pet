import { Component } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import { Http} from "@angular/http";
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { App } from 'ionic-angular/components/app/app'; 
import { TabsPage} from '../tabs/tabs';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Slides) slides: Slides;
  
  username=localStorage.getItem('username');
  petname=localStorage.getItem('petname');
 pic;pubpic;
  list=[];
  listp=[];
  constructor( private app:App,public navCtrl: NavController ,public navParams:NavParams,public http:Http) {
  }
 
  // close(){
  //   this.navCtrl.push(TabsPage);   
  // }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.http.get('http://192.168.110.1:3000/login/get?username='+this.username).subscribe(data=>{
      console.log(data['_body']);
      this.list=JSON.parse(data['_body']);
      // this.username1=this.username;
      // this.pic1=this.pic;
      this.pic= 'http://192.168.110.1:3000/upload/'+this.list[0]['pic'];
      console.log(this.pic);

     
    });

    this.http.get('http://192.168.110.1:3000/publish?username='+this.username).subscribe(data=>{
     
      var message=JSON.parse(data['_body']);

      console.log(message);
      for(var i=0;i<message.length;i++){
        this.list[i]=message[i];
        this.list[i].pubpic='http://192.168.110.1:3000/upload/'+this.list[i].pubpic;
      }
  
    });
  }
  goToSlide() {
    this.slides.slideTo(2, 500);
  }
  del(item,i){
    var date=item.date;
    console.log(date);
    this.http.get('http://192.168.110.1:3000/publish/del?date='+date).subscribe(data=>{
      console.log(data);
     
      this.list.splice(i,1);
      // this.navCtrl.push(MypetPage);
      
    });
  }

}
