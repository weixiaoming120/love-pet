import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetPage} from '../set/set';
import { ProfilePage} from '../profile/profile';
import { AddpetPage} from '../addpet/addpet';
import { MypetPage} from '../mypet/mypet';
import { FeedbackPage} from '../feedback/feedback';
import { HelarticlePage} from '../helarticle/helarticle';

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinePage');
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
    this.navCtrl.push(HelarticlePage,this.navParams);
  }

}
