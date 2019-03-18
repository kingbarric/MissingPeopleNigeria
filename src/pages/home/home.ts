import {Component} from "@angular/core";
import {NavController, PopoverController} from "ionic-angular";
import {Storage} from '@ionic/storage';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {TripsPage} from "../trips/trips";
import {SearchLocationPage} from "../search-location/search-location";
import { CrudService } from "../../services/CrudService";
import {ReportPersonPage} from "../report-person/report-person";
import { PostDetailsPage } from "../post-details/post-details";


import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // search condition
  public reportPage = ReportPersonPage;
  reports;
  public search = {
    name: "person search",
    date: new Date().toISOString()
  }

  constructor(private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController, 
    private crudService: CrudService,  public sanitizer: DomSanitizer) {
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

   

    this.crudService.getAll('reports/allpost')
    .subscribe((e:any)=>{
      console.log(e);
      this.reports = e;

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
}

//
