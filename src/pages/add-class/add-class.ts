import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, ViewController } from 'ionic-angular';
import { ClassModel, ClassService } from '../../services/class-service/class.service';
import { ScheduleService } from '../../services/schedule-service/schedule.service';
import { UserService } from '../../services/user-service/user.service';
import { ObservableCombiner } from '../../services/ObservableCombiner/observable-combiner.service'
import { FirebaseService } from '../../services/firebase/firebase.service'
import { CourseInstructorSearchPage } from '../course-instructor-search/course-instructor-search'
import { ViewSchedulePage } from '../view-schedule/view-schedule'

@Component({
  selector: 'page-add-class',
  templateUrl: 'add-class.html'
})
export class AddClassPage {


  private DaysOfWeek: Array<string> = ['Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday', 'Sunday'];

  private startTime: string;
  private endTime: string;
  private selectedDays: Array<string> = [];



  private selectedCourse;
  private selectedIntructor;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public classService: ClassService,
    public scheduleService: ScheduleService,
    public UserService: UserService,
    public observableCombiner: ObservableCombiner,
    public fb: FirebaseService,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl : ViewController) {     }

  generateDaysPerWeek() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Days Per Week');
    this.DaysOfWeek.forEach(day => {
      let checked: boolean =
        (this.selectedDays.findIndex(value => value === day) != -1) ?
          true : false;
      alert.addInput({
        type: 'checkbox',
        label: day,
        value: day,
        checked: checked
      });

    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        this.selectedDays = data;

      }
    });
    alert.present();
  }


  submit() {

    let entity: ClassModel = new ClassModel();

    entity.setEndDate(this.endTime.split(':')[0], this.endTime.split(':')[1]);
    entity.setStartDate(this.startTime.split(':')[0], this.startTime.split(':')[1]);

    this.DaysOfWeek.forEach(day => {
      let classThatDay: boolean =
        (this.selectedDays.findIndex(value => value === day) != -1) ?
          true : false;

      entity.addDay(day, classThatDay);
      //console.log(day, classThatDay);
    });


    entity.intructorKey = this.selectedIntructor.$key;
    entity.courseKey = this.selectedCourse.$key;


    this.observableCombiner.combineObservablesWithTake1(
      [
        this.fb.getAuth().take(1),
        this.classService.getAllObject().take(1)
      ],
      callback => {
        entity.userKey = callback[0].uid;
        let classesArray: Array<any> = [];
        delete callback[1].$exists;
        delete callback[1].$key;
        for (var property in callback[1]) {
          callback[1][property].$key = property;
          classesArray.push(callback[1][property]);
        }
        let key: string = this.classService.add(entity, classesArray);
        this.scheduleService.update(callback[0].uid, key);
        //this.viewCtrl.dismiss();
        
        this.navCtrl.setRoot(ViewSchedulePage);
      }
    );
  }


  instructorSearchSubmit($event) {
    this.selectedIntructor = $event[0].$key;
    this.selectedCourse = $event[1].$key;
    console.log($event);
  }
  courseSearchSubmit($event) {
    this.selectedCourse = $event[0].$key;
    this.selectedIntructor = $event[1].$key;
    console.log($event);
  }

  goToCourseSearch() {
    let profileModal = this.modalCtrl.create(CourseInstructorSearchPage);
    profileModal.onDidDismiss(data => {
      this.selectedIntructor = data['instructor'];
      this.selectedCourse = data['course'];
      console.log(data);
    });
    profileModal.present();
  }



  ionViewCanLeave(): boolean {
    try {
      this.scheduleService.destroy();
      this.UserService.destroy();
      this.classService.destroy();
      this.observableCombiner.destroy();
      this.fb.destroy();
      console.log('leaving')
      return true;
    } catch(err){
      return false;
    }
  }


}
