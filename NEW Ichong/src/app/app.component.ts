import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { StartPage } from '../pages/start/start';
import {Storage} from '@ionic/storage';
import { SettingDataProvider } from "../providers/setting-data/setting-data";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  theme: string;
  constructor( private storage: Storage,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,settingDataProvider: SettingDataProvider) {
  //通过key判断曾经是否进入过引导页
    this.storage.get('firstIn').then((result) => { 
      console.log('firstin is',result);
      result=false;
      if(result){  
        this.rootPage = LoginPage; 
      } 
      else{
        this.storage.set('firstIn', true);
        this.rootPage = StartPage;
      }
            
    });
    //夜间模式
     settingDataProvider.getActiveTheme().subscribe(theme => {
      if (theme) {
        this.theme = 'dark-theme';
      } else {
        this.theme = 'light-theme';
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  
}