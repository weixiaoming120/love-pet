import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsetPage } from './newset';

@NgModule({
  declarations: [
    NewsetPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsetPage),
  ],
})
export class NewsetPageModule {}
