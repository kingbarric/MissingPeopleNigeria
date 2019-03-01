import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {HomePage} from "../home/home";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.form = new FormGroup({
      caption: new FormControl('',[Validators.required]),
      message: new FormControl('',[Validators.required]),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPersonPage');
  }

  report(){
    console.log('posted')
  }

  cancel(){
    this.navCtrl.setRoot(HomePage);
  }
}
