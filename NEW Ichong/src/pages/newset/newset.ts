import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-newset',
  templateUrl: 'newset.html',
})
export class NewsetPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private vibration: Vibration) {
  }
  // Vibrate 2 seconds
  // Pause for 1 second
  // Vibrate for 2 seconds
  // Patterns work on Android and Windows only
  
  vib(){
    this.vibration.vibrate([1000,1000,1000]);
  }

}
