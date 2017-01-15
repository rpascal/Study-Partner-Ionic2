import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { FirebaseService } from '../services/firebase/firebase.service'
import { LoginPage } from '../pages/login/login'
import { ViewSchedulePage } from '../pages/view-schedule/view-schedule'
import { AddClassPage } from '../pages/add-class/add-class'
import { CourseInstructorSearchPage } from '../pages/course-instructor-search/course-instructor-search'


export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit, OnDestroy {
  rootPage;

  @ViewChild(Nav) nav: Nav;

  sidePages: PageInterface[] = [
    { title: 'Home', component: TabsPage, icon: 'log-in', index: 0 },
    { title: 'About', component: TabsPage, icon: 'person-add', index: 1 },
    { title: 'Contact', component: TabsPage, icon: 'person-add', index: 2 },
    { title: 'View Schedule', component: ViewSchedulePage, icon: 'person-add' },
    { title: 'Add Class', component: AddClassPage, icon: 'person-add' },
    { title: 'Search Course', component: CourseInstructorSearchPage, icon: 'person-add' },
    { title: 'Log out', component: TabsPage, icon: 'help', logsOut: true }
  ];

  ngOnInit() {
    this.fb.getAuthCallback(auth => {
      if (auth) {
        this.rootPage = TabsPage
      } else {
        this.rootPage = LoginPage
      }
    })
  }

  constructor(platform: Platform,
    public menu: MenuController,
    public fb: FirebaseService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //Splashscreen.show();
      Splashscreen.hide();
    });
  }

  openPage(page: PageInterface) {
    if (page.logsOut) {
      this.fb.logOut();
      this.nav.setRoot(LoginPage);
    } else {
      if (page.index) {
        this.nav.setRoot(page.component, { tabIndex: page.index });
      } else {
        this.nav.setRoot(page.component).catch(() => {
          console.log("Didn't set nav root");
        });
      }
    }
  }

  ngOnDestroy() {
    this.fb.destroy();
  }
}
