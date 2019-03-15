import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  citizen;
  name;
  email;
  address;
  img_url;

  constructor(public navCtrl: NavController,private camera: Camera, public navParams: NavParams, private storage : Storage) {
 this.callFromStorage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  callFromStorage(){
    this.storage.get('citizen').then((e) => {
      console.log('citi', e);
      this.citizen = JSON.parse(e);
      console.log(this.citizen);
      this.name = this.citizen.firstname + " "+this.citizen.lastname;
      this.email = this.citizen.email;
      this.address = this.citizen.address;
    });
  }

  ionViewWillEnter(){

   
  }


  async takePhoto() {
    try {
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        sourceType: this.camera.PictureSourceType.CAMERA,
        allowEdit:true

      }
      const result = await this.camera.getPicture(options);

      const image = 'data:image/jpeg;base64,' + result;
      this.img_url = image;
       

    } catch (e) { console.error(e) }
  }



   
  async browsePhoto() {
    try {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit:true
      }
      const result = await this.camera.getPicture(options);

      const image = 'data:image/jpeg;base64,' + result;
      this.img_url = image;
     

    } catch (e) { console.error(e)
     }
  }
}
