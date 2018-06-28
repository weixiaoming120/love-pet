import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MypetPage } from './mypet';

@NgModule({
  declarations: [
    MypetPage,
  ],
  imports: [
    IonicPageModule.forChild(MypetPage),
  ],
})
export class MypetPageModule {}
