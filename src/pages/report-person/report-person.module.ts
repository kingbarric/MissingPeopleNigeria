import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportPersonPage } from './report-person';

@NgModule({
  declarations: [
    ReportPersonPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportPersonPage),
  ],
})
export class ReportPersonPageModule {}
