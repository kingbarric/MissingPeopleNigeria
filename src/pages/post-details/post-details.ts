import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HomePage } from '../home/home';
import { CrudService } from '../../services/CrudService';

/**
 * Generated class for the PostDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-details',
  templateUrl: 'post-details.html',
})
export class PostDetailsPage {
  form;

  constructor(public navCtrl: NavController, public navParams: NavParams, public crudService: CrudService) {
    this.form = new FormGroup({
      caption: new FormControl('',[Validators.required]),
      message: new FormControl('',[Validators.required]),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostDetailsPage');
  }

  cancel(){
    this.navCtrl.setRoot(HomePage);
  }
  report(){
    let datas = this.form.value;
    const reports = {
      message:datas.message,
      caption:datas.caption,
      citizenId:1
    }
    this.crudService.saveData('reports/save',reports,0)
    .subscribe((e:any)=>{
      
      console.log('data saved: ',e);
      if(e.id >0){
       this.crudService.toast('Reported successfully');
       this.navCtrl.setRoot(HomePage);
     }else{
       this.crudService.toast('error');
     }
    })
    console.log(reports);
  }
}
