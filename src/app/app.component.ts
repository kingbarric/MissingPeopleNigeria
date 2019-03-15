import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, Events } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { SearchPeoplePage } from "../pages/search-people/search-people";
import { SearchByPhotoPage } from "../pages/search-by-photo/search-by-photo";
import { PrivateMessagePage } from "../pages/private-message/private-message";
import { AboutPage } from "../pages/about/about";
import { HelpPage } from "../pages/help/help";
import { ProfilePage } from "../pages/profile/profile";
import {PostDetailsPage} from '../pages/post-details/post-details';
import {Storage} from '@ionic/storage';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  appMenuItems: Array<MenuItem>;
  fullname;
  citizen;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    private storage: Storage,
    public event: Events
  ) {
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'},
      {title: 'Report Person', component: PostDetailsPage, icon: 'sunny'},
      {title: 'Search People', component: SearchPeoplePage, icon: 'contact'},
      {title: 'Search People By Photo', component: SearchByPhotoPage, icon: 'photos'},
      {title: 'Private Message', component: PrivateMessagePage, icon: 'logo-twitch'},
      {title: 'About', component: AboutPage, icon: 'information'},
      {title: 'Help', component: HelpPage, icon: 'sunny'}
    ];

    event.subscribe('user:loggedin', (citizen, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome', citizen, 'at', time);
      this.citizen = citizen;
    });
  }

  ionViewWillEnter(){
    this.storage.get('citizen').then((e) => {
      console.log('citi', e);
      this.citizen = JSON.parse(e.citizen);
      console.log(this.citizen);
    });
   
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
     // this.keyboard.disableScroll(true);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.nav.setRoot(LoginPage);
  }
  editProfile(){
    this.nav.push(ProfilePage);
  }
}
