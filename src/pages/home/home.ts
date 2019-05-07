import {Component} from "@angular/core";
import {NavController, PopoverController, Events} from "ionic-angular";
import {Storage} from '@ionic/storage';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {ReportCommentPage} from "../report-comment/report-comment";
import {TripsPage} from "../trips/trips";
import {SearchLocationPage} from "../search-location/search-location";
import { CrudService } from "../../services/CrudService";
import {ReportPersonPage} from "../report-person/report-person";
import { PostDetailsPage } from "../post-details/post-details";


import { DomSanitizer } from '@angular/platform-browser';
import {TripDetailPage} from "../trip-detail/trip-detail";
import { ActivityService } from "../../services/activity-service";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // search condition
  loading=true;
  public reportPage = ReportPersonPage;
  reports;
  public search = {
    name: "person search",
    date: new Date().toISOString()
  }

  constructor(private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController, 
    private crudService: CrudService,  public sanitizer: DomSanitizer,
     public event :Events, private act: ActivityService) {
     //  this.sanitizer.bypassSecurityTrustResourceUrl
  }

  sanitize(img){
   return this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,'+img);
  }

  ionViewWillEnter() {
    
    this.storage.get('pickup').then((val) => {
      console.log('bra',val)
      if (val === null) {
        this.search.name = "citizen"
      } else {
        this.search.name = val;
      }
    }).catch((err) => {
      console.log(err)
    });

    this.storage.get('email').then((e) => {
      console.log('Your age is', e);
    });

   

    this.loading =true;
    this.crudService.getAll('reports/allpost')
    .subscribe((e:any)=>{
      console.log(e);
      this.reports = e;
this.loading =false;
    })
  }

  // go to result page
  doSearch() {
    this.nav.push(TripsPage);
  }

  // choose place
  choosePlace(from) {
    this.nav.push(SearchLocationPage, from);
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }
  postMissing(){
    this.nav.setRoot(PostDetailsPage);
  }

  gotoComment(post){
    this.act.setPost(post);
  
    this.storage.set('post',JSON.stringify(post)).then((e:any)=>{
    //  this.event.publish('post:data', post, Date.now());
    console.log(post);
      this.nav.push(ReportCommentPage);
    });
    
  }
}

//
