import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddpetPage } from './addpet';

@NgModule({
  declarations: [
    AddpetPage,
  ],
  imports: [
    IonicPageModule.forChild(AddpetPage),
  ],
})
export class AddpetPageModule {}
