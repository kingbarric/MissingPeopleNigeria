import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CrudService } from '../../services/CrudService';

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
  userId;

  constructor(public navCtrl: NavController,private camera: Camera, 
    public navParams: NavParams, private storage : Storage, private platform: Platform,private crudService :CrudService) {
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
      this.userId = this.citizen.id;
      this.getProfileImage(this.userId);
    });
  }

getProfileImage(id){
  this.crudService.getByID("citizens/profileimage",id)
  .subscribe((d:any)=>{
this.img_url = 'data:image/png;base64,'+ d.message;
  })
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
    //  const result = await this.camera.getPicture(options);

     

      this.platform.ready().then(() => {
        if(this.platform.is('cordova')){
          
            this.camera.getPicture(options).then((imageData) => {
                // imageData is either a base64 encoded string or a file URI
                // If it's base64 (DATA_URL):
                let base64Image = 'data:image/jpeg;base64,' + imageData;
                console.log(base64Image); 
                const image = 'data:image/jpeg;base64,' + imageData;
                this.img_url = image;
                this.saveImage(imageData);

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
                this.img_url = image;
                this.saveImage(imageData);
            }, (err) => {
                // Handle error
                this.crudService.toast("Error : "+err);
            });
        }
    })

    } catch (e) { console.error(e); this.crudService.toast("Error : "+e);
     }
  }

  saveImage(data){
    let fd = new FormData();
                // fd.append("file",data);
                // fd.append("id",1+"");
                const d = {
                  file : data,
                  id : this.userId
                }
                this.crudService.saveData('citizens/upload',d,0)
                .subscribe((e:any)=>{
                  
                  console.log('data saved: ',e);
                  if(e.code==0){
                   this.crudService.toast(e.message); 
                 }else{
                   this.crudService.toast(e.message);
                 }
                })
  }
}
