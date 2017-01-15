import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ViewSchedulePage } from '../pages/view-schedule/view-schedule';
import {AddClassPage} from '../pages/add-class/add-class';
import {CourseInstructorSearchPage} from '../pages/course-instructor-search/course-instructor-search'

export class pages {
  static getPages() {
    return [
      AboutPage,
      ContactPage,
      HomePage,
      TabsPage,
      LoginPage,
      ViewSchedulePage,
      AddClassPage,
      CourseInstructorSearchPage
    ];
  }
}