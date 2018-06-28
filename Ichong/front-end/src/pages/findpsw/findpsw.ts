import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
@IonicPage()
@Component({
  selector: 'page-findpsw',
  templateUrl: 'findpsw.html',
})
export class FindpswPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindpswPage');
  }
  ionViewDidEnter(){
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
       Object.keys(elements).map((key) => {
          elements[key].style.display = 'none';
         });
       }   
  }
  //ionic当退出页面的时候触发的方法
  ionViewWillLeave() {
      let elements = document.querySelectorAll(".tabbar");
      if (elements != null) {
      Object.keys(elements).map((key) => {
          elements[key].style.display = 'flex';
    });
      }
  }
  //获取验证码
  obtain(){
    
  }
  //确认按钮
  conFirm(){
    this.navCtrl.push(LoginPage);
  }
}
