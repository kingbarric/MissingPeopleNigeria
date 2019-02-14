import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPersonPage } from './search-person';

@NgModule({
  declarations: [
    SearchPersonPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPersonPage),
  ],
})
export class SearchPersonPageModule {}
