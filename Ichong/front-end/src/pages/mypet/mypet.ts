import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { Http } from "@angular/http";
import { App } from 'ionic-angular/components/app/app'; 
import { TabsPage} from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-mypet',
  templateUrl: 'mypet.html',
})
export class MypetPage {
  list=[];
  age:number;
  list1:number[]=[];
  petdate:string;
  petID;
  petname1;
  petpic;
  constructor(public alertCtrl: AlertController,private app:App, public navCtrl: NavController, public navParams: NavParams,public http:Http) {
  }
  username=localStorage.getItem('username');

  ionViewWillEnter() {
    let nowdate=new Date();
    let nowyear=nowdate.getFullYear();

    console.log('ionViewDidLoad MypetPage');
    console.log(this.username);

    this.http.get('http://192.168.110.1:3000/petmessage?username='+this.username).subscribe( data=>{ 
        console.log(JSON.parse(data['_body']));
        this.list=JSON.parse(data['_body']);
        var mess=JSON.parse(data['_body']);
        for(var i=0;i<mess.length;i++){
          this.list[i]=mess[i];
          this.list[i].petpic='http://192.168.110.1:3000/upload/'+this.list[i].petpic;
          this.petdate=this.list[i]['petdate'];
          // 日期
          this.petdate=this.petdate.replace(/-/g, '/');
          let date = new Date(this.petdate);
          let year=date.getFullYear();

          this.age=nowyear-year;          
          console.log(this.age);
          this.list[i]['petdate']=this.age.toString();
        }
        console.log(this.list);
     
    });

  }

  del(item,i){
  
    var name=item.petname;
    this.http.get('http://192.168.110.1:3000/petmessage/del?petname='+name).subscribe(data=>{
      console.log(data);
      this.list.splice(i,1);
      // this.navCtrl.push(MypetPage);
      
    });
  }
  presentAlert2() {
    let alert = this.alertCtrl.create({
      title: '更换成功！',
      buttons: ['OK']
    });
    alert.present();
    this.app.getRootNavs()[0].setRoot(TabsPage);      
    
  }
  presentAlert1() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      buttons: ['OK']
    });
    alert.present();
  }
  change(item){
    console.log('a');
     for(var i = 0; i < this.list.length; i++) {
      this.petname1=this.list[i]['petname'];
        if(this.list[i] == item){
          localStorage.setItem('petname',this.petname1);
          this.presentAlert2();
          // this.app.getRootNavs()[0].setRoot(TabsPage);      
          console.log(this.petname1);
        }
       }
      // var s=document.querySelector('.sel');ss
      // s['style'].background='red';
  }
  
}
