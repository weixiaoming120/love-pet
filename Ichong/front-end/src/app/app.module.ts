import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule} from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
import { Vibration } from '@ionic-native/vibration';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SetPage } from '../pages/set/set';
import { ProfilePage } from '../pages/profile/profile';
import { AddpetPage } from '../pages/addpet/addpet';
import { FeedbackPage } from '../pages/feedback/feedback';
import { MypetPage} from '../pages/mypet/mypet';
import { NewsetPage} from '../pages/newset/newset';
import { SpoilPage} from '../pages/spoil/spoil';
import { YimiaoPage } from '../pages/yimiao/yimiao';
import { MinePage } from '../pages/mine/mine';
import { GeneralPage } from '../pages/general/general';
import { HelarticlePage } from '../pages/helarticle/helarticle';
import { AddymPage } from '../pages/addym/addym';
import { PetdetailPage } from '../pages/petdetail/petdetail';
import { PetpublishPage } from '../pages/petpublish/petpublish';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AgreementPage } from '../pages/agreement/agreement';
import { FindpswPage } from '../pages/findpsw/findpsw';
import { StartPage } from '../pages/start/start';
import { TextPage } from '../pages/text/text';
import { AddhealrePage } from '../pages/addhealre/addhealre';
import { ImprovePage } from '../pages/improve/improve';
import { CollectartPage } from '../pages/collectart/collectart';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//城市
import { MultiPickerModule } from 'ion-multi-picker';
import { CityDataProvider } from '../providers/city-data/city-data';

import { SettingDataProvider } from '../providers/setting-data/setting-data';
import { HttpModule } from "@angular/http";
import { HTTP } from "@ionic-native/http";


import {Camera} from "@ionic-native/camera";
import {ImagePicker} from "@ionic-native/image-picker";
// import {Base64} from '@ionic-native/base64';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SetPage,
    ProfilePage,
    AddpetPage,
    MypetPage,
    FeedbackPage,
    NewsetPage,
    SpoilPage,
    YimiaoPage,
    MinePage,
    GeneralPage,
    HelarticlePage,
    AddymPage,
    PetdetailPage,
    PetpublishPage,
    LoginPage,
    RegisterPage,
    AgreementPage,
    FindpswPage,
    StartPage,
    TextPage,
    AddhealrePage,
    ImprovePage,
    CollectartPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    MultiPickerModule,
    HttpModule,
    // HTTP
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SetPage,
    ProfilePage,
    AddpetPage,
    MypetPage,
    FeedbackPage,
    NewsetPage,
    SpoilPage,
    YimiaoPage,
    MinePage,
    GeneralPage,
    HelarticlePage,
    AddymPage,
    PetdetailPage,
    PetpublishPage,
    LoginPage,
    RegisterPage,
    AgreementPage,
    FindpswPage,
    StartPage,
    LoginPage,
    TextPage,
    AddhealrePage,
    ImprovePage,
    CollectartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CityDataProvider,
    SettingDataProvider,
    Camera,
    ImagePicker,
    Keyboard,
    Vibration,
    HTTP    
  ]
})
export class AppModule {providers:[Keyboard]}
