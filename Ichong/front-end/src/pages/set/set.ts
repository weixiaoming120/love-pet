import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { SettingDataProvider} from "../../providers/setting-data/setting-data";
import { NewsetPage} from '../newset/newset';
import { LoginPage} from '../login/login';
import { App } from 'ionic-angular/components/app/app'; 
@IonicPage()
@Component({
  selector: 'page-set',
  templateUrl: 'set.html',
})
export class SetPage {
  theme: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams , private app:App, public toastCtrl: ToastController, public settingDataProvider: SettingDataProvider) {
    this.getActiveTheme();
  }
  newset(){
    this.navCtrl.push(NewsetPage,this.navParams);
  }
  logout(){
    this.app.getRootNavs()[0].setRoot(LoginPage);
  }
  //theme夜间模式
  getActiveTheme() {
    this.settingDataProvider.getActiveTheme().subscribe(theme => {
      this.theme = theme;
    });
  }
  toggleTheme() {
    if (!this.theme) {
      this.presentToast('关闭应用后夜间模式将失效');
    }
    this.settingDataProvider.setActiveTheme(!this.theme);
  }
  presentToast(message: string) {
    let toast = this.toastCtrl.create({message: message, duration: 2000});
    toast.present().then(value => {
      return value;
    });
  }

}
