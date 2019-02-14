import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchByPhotoPage } from './search-by-photo';

@NgModule({
  declarations: [
    SearchByPhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchByPhotoPage),
  ],
})
export class SearchByPhotoPageModule {}
