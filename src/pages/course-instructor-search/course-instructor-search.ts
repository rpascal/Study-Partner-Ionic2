import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { InstructorService } from '../../services/instructorService/instructor.service';
import { CourseService } from '../../services/courseService/course.service';


@Component({
  selector: 'page-course-instructor-search',
  templateUrl: 'course-instructor-search.html'
})
export class CourseInstructorSearchPage {

  public listCourse;
  public seletedCourse;
  public intructorsForCourse: Array<any>;
  private masterCourses: Array<any>;
  private masterIntructors;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public is: InstructorService,
    public cs: CourseService,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController) {
  }

  private loading;

  ngOnInit() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading Courses'
    });

    this.loading.present();

    this.cs.getAllListCallBack(courses => {
      this.masterCourses = courses;
      this.loading.dismiss();
    });
    this.is.getAllObjectCallBack(intructors => {
      this.masterIntructors = intructors;
    });
  }




  selected(course) {
    this.seletedCourse = course;
    let temp = this.seletedCourse.Instructors
    if (!!temp) {
      this.intructorsForCourse = [];
      for (var property in temp) {
        this.masterIntructors[property].$key = property;
        this.intructorsForCourse.push(this.masterIntructors[property]);
      }
    }
  }

  onSelectInstruc(intruc): void {
    let output = {
      course: this.seletedCourse,
      instructor: intruc
    }
    this.viewCtrl.dismiss(output);
  }


  public searchChangedCourse(ev) {
    var value = ev.target.value;
    this.seletedCourse = null;
    if (value === '')
      value = ' ';
    this.searchCourse(value);
  }
  searchCourse(search) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();

    this.listCourse = this.masterCourses.filter(a => {
      return a.course.startsWith(search);
    });

    this.loading.dismiss();
  }

  ionViewCanLeave(): boolean {
    try {
      this.is.destroy();
      this.cs.destroy();
      return true;
    } catch (err) {
      return false;
    }
  }

}
