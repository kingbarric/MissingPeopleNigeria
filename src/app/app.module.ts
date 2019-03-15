import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {File} from '@ionic-native/file';
import {FileChooser} from  '@ionic-native/file-chooser';
import {Camera} from '@ionic-native/camera';
import {Keyboard} from '@ionic-native/keyboard';

import {ActivityService} from "../services/activity-service";
import {TripService} from "../services/trip-service";
import {WeatherProvider} from "../services/weather";
import {CrudService} from "../services/CrudService";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';




import {MyApp} from "./app.component";

import {SettingsPage} from "../pages/settings/settings";
import {CheckoutTripPage} from "../pages/checkout-trip/checkout-trip";
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {NotificationsPage} from "../pages/notifications/notifications";
import {RegisterPage} from "../pages/register/register";
import {SearchLocationPage} from "../pages/search-location/search-location";
import {TripDetailPage} from "../pages/trip-detail/trip-detail";
import {TripsPage} from "../pages/trips/trips";
import {LocalWeatherPage} from "../pages/local-weather/local-weather";
import { PagesServicesCrudServiceProvider } from '../providers/pages-services-crud-service/pages-services-crud-service';
import {PrivateMessagePage} from "../pages/private-message/private-message";
import {SearchPeoplePage} from "../pages/search-people/search-people";
import {SearchByPhotoPage} from "../pages/search-by-photo/search-by-photo";
import {AboutPage} from "../pages/about/about"; 
import {HelpPage} from "../pages/help/help";
import { ProfilePage } from "../pages/profile/profile";
import {PostDetailsPage} from "../pages/post-details/post-details";
import {FormsModule } from '@angular/forms';

// import services
// end import services
// end import services
// import pages
// end import pages

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    CheckoutTripPage,
    HomePage,
    LoginPage,
    PrivateMessagePage,
    SearchPeoplePage,
    SearchByPhotoPage,
    AboutPage,
    HelpPage,
    PostDetailsPage,
    LocalWeatherPage,
    NotificationsPage,
    RegisterPage,
    SearchLocationPage,
    TripDetailPage,
    TripsPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({
      name: '__ionic3_start_theme',
        driverOrder: ['sqlite','indexeddb',  'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    CheckoutTripPage,
    HomePage,
    LoginPage,
    PrivateMessagePage,
    SearchPeoplePage,
    SearchByPhotoPage,
    AboutPage,
    HelpPage,
    PostDetailsPage,
    LocalWeatherPage,
    NotificationsPage,
    RegisterPage,
    SearchLocationPage,
    TripDetailPage,
    TripsPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    ActivityService,
    TripService,
    CrudService,
    WeatherProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PagesServicesCrudServiceProvider,
   
    FileTransferObject,
   
   
  ]
})

export class AppModule {
}
