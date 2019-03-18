import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {HomePage} from "../home/home";
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ReportPersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-person',
  templateUrl: 'report-person.html',
})
export class ReportPersonPage {
  form;
userId;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage : Storage) {
    this.form = new FormGroup({
      caption: new FormControl('',[Validators.required]),
      message: new FormControl('',[Validators.required]),
    });

    this.callFromStorage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPersonPage');
  }

  report(){
    console.log('posted')
  }

  callFromStorage(){
    this.storage.get('citizen').then((e) => {
      console.log('citi', e);
    const c = JSON.parse(e);
      this.userId = c.id;
    });
  }

  cancel(){
    this.navCtrl.setRoot(HomePage);
  }
}
