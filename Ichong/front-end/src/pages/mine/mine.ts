import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetPage} from '../set/set';
import { ProfilePage} from '../profile/profile';
import { AddpetPage} from '../addpet/addpet';
import { MypetPage} from '../mypet/mypet';
import { FeedbackPage} from '../feedback/feedback';
import { HelarticlePage} from '../helarticle/helarticle';
import { Http} from "@angular/http";
import { CollectartPage} from '../collectart/collectart';
@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {
  user=localStorage.getItem('username');
  introduction;
  pic;
  list:number[]=[1,2,3,4,5];
  constructor(private http:Http, public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ionViewDidEnter() {
    console.log('ionViewDidLoad MinePage');
    console.log("昵称："+this.user);
    this.http.get('http://192.168.110.1:3000/login/get?username='+this.user).subscribe(data=>{
      console.log(data['_body']);
      this.list=JSON.parse(data['_body']);
      this.introduction= this.list[0]['introduction'];
      this.pic= 'http://192.168.110.1:3000/upload/'+this.list[0]['pic'];
      console.log(this.pic);
    });
  }
  addpet(){
    this.navCtrl.push(AddpetPage,this.navParams);
  }
  set(){
    this.navCtrl.push(SetPage,this.navParams);
  }
  mypet(){
    this.navCtrl.push(MypetPage,this.navParams);
  }
  profile(){
    this.navCtrl.push(ProfilePage,this.navParams);
  }
  feedback(){
    this.navCtrl.push(FeedbackPage,this.navParams);
  }
  colart(){
    this.navCtrl.push(CollectartPage,this.navParams);
  }


}
