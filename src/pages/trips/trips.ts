import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {TripService} from "../../services/trip-service";
import {TripDetailPage} from "../trip-detail/trip-detail";

@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html'
})
export class TripsPage {
  // list of trips
  public trips: any;
  reportId;


  constructor(public nav: NavController, public tripService: TripService,public navParams: NavParams) {
    // set sample data
    this.trips = tripService.getAll();
    this.reportId = navParams.get('data');
    console.log(this.reportId);
  }

  // view trip detail
  viewDetail(id) {
    this.nav.push(TripDetailPage, {id: id});
  }
}
