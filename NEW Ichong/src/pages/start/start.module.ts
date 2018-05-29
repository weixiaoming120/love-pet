import { NgModule } from '@angular/core';
import { IonicPageModule,NavController } from 'ionic-angular';
import { StartPage } from '../start/start';
import { TabsPage } from '../tabs/tabs';
@NgModule({
  declarations: [
    StartPage,
  ],
  imports: [
    IonicPageModule.forChild(StartPage),
  ],
})
export class StartPageModule {
  constructor(public navCtr: NavController){ 
  }

  goToHome(){
      this.navCtr.setRoot(TabsPage);
  }
}
