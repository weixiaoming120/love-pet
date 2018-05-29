import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddymPage } from '../addym/addym';

@IonicPage()
@Component({
  selector: 'page-yimiao',
  templateUrl: 'yimiao.html',
})
export class YimiaoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  addym(){
    this.navCtrl.push(AddymPage);
  }

}
