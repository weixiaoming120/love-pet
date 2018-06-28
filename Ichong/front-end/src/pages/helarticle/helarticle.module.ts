import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelarticlePage } from './helarticle';

@NgModule({
  declarations: [
    HelarticlePage,
  ],
  exports:[HelarticlePage],
  imports: [
    IonicPageModule.forChild(HelarticlePage),
  ],
})
export class HelarticlePageModule {}
