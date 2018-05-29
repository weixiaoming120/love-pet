import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PetdetailPage } from './petdetail';

@NgModule({
  declarations: [
    PetdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PetdetailPage),
  ],
})
export class PetdetailPageModule {}
