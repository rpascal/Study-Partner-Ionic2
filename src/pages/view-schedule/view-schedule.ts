import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { FirebaseService } from '../../services/firebase/firebase.service';
import { ScheduleService } from '../../services/schedule-service/schedule.service';
import { UserService } from '../../services/user-service/user.service';
import { ClassService } from '../../services/class-service/class.service';

import { InstructorService } from '../../services/instructorService/instructor.service';
import { CourseService } from '../../services/courseService/course.service';
import { ObservableCombiner } from '../../services/ObservableCombiner/observable-combiner.service'

@Component({
  selector: 'page-view-schedule',
  templateUrl: 'view-schedule.html'
})
export class ViewSchedulePage {

  private masterClasses: Array<any>;
  private outputClasses: Array<any>;
  private scheduleKeys: Array<any>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public instructorService: InstructorService,
    public courseService: CourseService,
    public fb: FirebaseService,
    public scheduleService: ScheduleService,
    public UserService: UserService,
    public classService: ClassService,
    public observableCombiner: ObservableCombiner,
    public loadingCtrl: LoadingController) {
    console.log("this.navParams.get('data')");
  }

  public loading;


  ionViewDidLoad() {

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();

    console.log('inti')

    this.classService.getAllObjectCallback(classes => {
      console.log('inti clas', classes)
      this.masterClasses = classes;
      this.filterClasses();
    });
    console.log(this.scheduleService)
    this.scheduleService.getCurrentUsersScheduleCallback(userSchedule => {
      console.log('schedule', userSchedule)
      this.scheduleKeys = userSchedule;
      delete this.scheduleKeys['$exists'];
      delete this.scheduleKeys['$key'];
      this.filterClasses();
    })
  }

  onSelectClass(selectedClass) {
    console.log(selectedClass)
  }


  filterClasses(): void {
    if (this.scheduleKeys != null && this.masterClasses != null) {

      this.outputClasses = [];
      for (var property in this.scheduleKeys) {
        this.masterClasses[property].$key = property;
        this.outputClasses.push(this.masterClasses[property]);
      }
      this.outputClasses.sort((a, b) => {
        let aStart: Date = new Date(a.startDate);
        let bStart: Date = new Date(b.startDate);
        if (aStart < bStart)
          return -1;
        else if (aStart > bStart)
          return 1;
        return 0;
      });
      this.outputClasses.forEach((value, i) => {
        const value2 = value;
        const ii = i;
        this.courseService.getSpecificObject(value2.courseKey, v => {
          this.outputClasses[ii]['courseNum'] = v.course;
        })
        this.instructorService.getSpecificObject(value2.intructorKey, v => {
          this.outputClasses[ii]['intructorName'] = v.name;
        })
      })

      this.loading.dismiss();
    }
  }

  onDeleteClass(value) {
    this.observableCombiner.combineObservablesWithTake1(
      [
        this.fb.getAuth().take(1),
        this.scheduleService.getAllObject().take(1)
      ], callback => {
        let currentUserUID = callback[0].uid;
        let schedule = callback[1];
        this.scheduleService.deleteClassFromSpecific(currentUserUID, value.$key)
        let exists: boolean = this.scheduleService.checkExist(currentUserUID, schedule, value.$key);
        if (!exists) {
          this.classService.deleteClass(value.$key);
        }
      }
    );
  }


  ionViewCanLeave(): boolean {
    try {
      this.instructorService.destroy();
      this.courseService.destroy();
      this.scheduleService.destroy();
      this.UserService.destroy();
      this.classService.destroy();
      this.observableCombiner.destroy();
      this.fb.destroy();
      return true;
    } catch (err) {
      return false;
    }
  }


}
