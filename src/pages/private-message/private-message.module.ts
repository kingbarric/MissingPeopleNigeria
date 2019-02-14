import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrivateMessagePage } from './private-message';

@NgModule({
  declarations: [
    PrivateMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(PrivateMessagePage),
  ],
})
export class PrivateMessagePageModule {}
