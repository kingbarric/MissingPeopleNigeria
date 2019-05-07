import {Component} from "@angular/core";
import {NavController, Events} from "ionic-angular";
import {TripService} from "../../services/trip-service";
import {CheckoutTripPage} from "../checkout-trip/checkout-trip";
import { Storage } from "@ionic/storage";
import { ActivityService } from "../../services/activity-service";
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CrudService } from "../../services/CrudService";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'page-report-comment',
  templateUrl: 'report-comment.html'
})
export class ReportCommentPage {
  // trip info
  public trip: any;
  form;
  // number of adult
  public adults = 2;
  // number of children
  public children = 0;
  public post:any;
  userId=0;
  loading =false;
  comments=[];

  constructor(public nav: NavController, public tripService: TripService,
     public act: ActivityService, public storage : Storage, public event : Events,
     public sanitizer: DomSanitizer,
      public crudService: CrudService) {
    // set sample data
    this.trip = tripService.getItem(1);
    this.post = act.getData();

    this.form = new FormGroup({
      caption: new FormControl('',[Validators.required])
    });
    
    // this.storage.get('post').then((e) => {
    //   console.log(e);
    //   this.post = JSON.parse(e);
     
    // });
    // setTimeout(function(){
    //   event.subscribe('post:data', (post, time) => {
    //     // user and time are the same arguments passed in `events.publish(user, time)`
    //    this.post = post;
        
    //   });
    // },2000);
  
    this.callFromStorage();
    console.log('item: ',this.post);
    console.log('TRIP: ',this.trip);
  }

  sanitize(img){
    return this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,'+img);
   }

  // minus adult when click minus button
  minusAdult() {
    this.adults--;
  }
  ionViewWillEnter(){
 
  this.callComments();
  }

  callComments(){
    this.loading =true;
    this.crudService.getAll('comment/byreportid/'+this.post.id)
    .subscribe((e:any)=>{
      console.log(e);
      this.comments = e;
this.loading =false;
    })
  }

  // plus adult when click plus button
  plusAdult() {
    this.adults++;
  }

  // minus children when click minus button
  minusChildren() {
    this.children--;
  }

  // plus children when click plus button
  plusChildren() {
    this.children++;
  }

  // go to checkout page
  checkout() {
    this.nav.push(CheckoutTripPage);
  }

  ionViewCanEnter(){
  }

  callFromStorage(){
    this.storage.get('citizen').then((e) => {
      console.log('citi', e);
      if(e){
        const c = JSON.parse(e);
      this.userId = c.id;
      }
    
    });
  }

  comment(){
    const data = {
      comment:this.form.value.caption,
      citizenId: this.userId,
      reportId: this.post.id
    }
    console.log(data);
    this.crudService.saveData('comment/save',data,0)
    .subscribe((e:any)=>{
      
      console.log('data saved: ',e);
      if(e.code==0){
       this.crudService.toast(e.message);
     //  this.nav.setRoot(LoginPage);
     this.callComments();
     this.form.value.caption= '';
     }else{
       this.crudService.toast(e.message);
     }
    })
  }
}
