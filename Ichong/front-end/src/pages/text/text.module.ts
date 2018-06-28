import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextPage } from './text';

@NgModule({
  declarations: [
    TextPage,
  ],
  imports: [
    IonicPageModule.forChild(TextPage),
  ],
})
export class TextPageModule {}
