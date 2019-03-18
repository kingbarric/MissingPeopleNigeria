import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HomePage } from '../home/home';
import { CrudService } from '../../services/CrudService';
import {Storage} from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  userId;
  imageUrl;
  imageData;
  isPosted = false;

  constructor(public navCtrl: NavController,private camera: Camera,
    private platform : Platform,
     public navParams: NavParams, public crudService: CrudService,private storage : Storage) {
    this.form = new FormGroup({
      caption: new FormControl('',[Validators.required]),
      message: new FormControl('',[Validators.required]),
    });
    this.callFromStorage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostDetailsPage');
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
  report(){
    this.isPosted =true;
    if(this.isPosted){
    let datas = this.form.value;
    if(this.imageData !==''){
      const reports = {
        content:datas.message,
        postTitle:datas.caption,
        userId:this.userId,
        postImage: this.imageData
      }
      this.crudService.saveData('reports/save',reports,0)
      .subscribe((e:any)=>{
        
        console.log('data saved: ',e);
        if(e.code ==0){
         this.crudService.toast('Reported successfully');
         this.navCtrl.setRoot(HomePage);
       }else{
        this.crudService.toast('error');
       }
      })
    }else{
      this.crudService.toast('Please add person image first');
    }
  }
  
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
    //  const result = await this.camera.getPicture(options);

     

      this.platform.ready().then(() => {
        if(this.platform.is('cordova')){
          
            this.camera.getPicture(options).then((imageData) => {
                // imageData is either a base64 encoded string or a file URI
                // If it's base64 (DATA_URL):
                let base64Image = 'data:image/jpeg;base64,' + imageData;
                console.log(base64Image); 
                const image = 'data:image/jpeg;base64,' + imageData;
                this.imageUrl = image;
                this.imageData = imageData;

            }, (err) => {
                // Handle error
                this.crudService.toast("Error : "+err);
            });
        }
    })
       

    } catch (e) { console.error(e);
    this.crudService.toast("Error : "+e);
    }
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
      // const result = await this.camera.getPicture(options);

      // const image = 'data:image/jpeg;base64,' + result;
      // this.img_url = image;
     
      this.platform.ready().then(() => {
        if(this.platform.is('cordova')){
          
            this.camera.getPicture(options).then((imageData) => {
                // imageData is either a base64 encoded string or a file URI
                // If it's base64 (DATA_URL):
                let base64Image = 'data:image/jpeg;base64,' + imageData;
                console.log(base64Image); 
                const image = 'data:image/jpeg;base64,' + imageData;
                this.imageUrl = image;
                this.imageData = imageData;
            }, (err) => {
                // Handle error
                this.crudService.toast("Error : "+err);
            });
        }
    })

    } catch (e) { console.error(e); this.crudService.toast("Error : "+e);
     }
  }
}
