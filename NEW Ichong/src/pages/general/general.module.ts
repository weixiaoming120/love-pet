import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneralPage } from './general';

@NgModule({
  declarations: [
    GeneralPage,
  ],
  imports: [
    IonicPageModule.forChild(GeneralPage),
  ],
})
export class GeneralPageModule {}
