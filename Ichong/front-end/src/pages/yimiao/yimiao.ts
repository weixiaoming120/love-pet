import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddymPage } from '../addym/addym';
import { Http} from "@angular/http";
@IonicPage()
@Component({
  selector: 'page-yimiao',
  templateUrl: 'yimiao.html',
})
export class YimiaoPage {
  username=localStorage.getItem('username');
  petname=localStorage.getItem('petname');
  list:number[]=[1,2,3,4,5];

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
  }
  addym(){
    this.navCtrl.push(AddymPage);
  }
  ionViewDidLoad() {


    this.http.get('http://192.168.110.1:3000/vaccine?username='+this.username+'&petname=xx').subscribe(data=>{
      console.log(data['_body']);
      this.list=JSON.parse(data['_body']);
      console.log(this.list);
    });
  }

}
