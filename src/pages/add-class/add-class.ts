import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams ,AlertController } from 'ionic-angular';
import { ClassModel, ClassService } from '../../services/class-service/class.service';
import { ScheduleService } from '../../services/schedule-service/schedule.service';
import { UserService } from '../../services/user-service/user.service';
import { ObservableCombiner } from '../../services/ObservableCombiner/observable-combiner.service'
import { FirebaseService } from '../../services/firebase/firebase.service'

/*
  Generated class for the AddClass page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-class',
  templateUrl: 'add-class.html'
})
export class AddClassPage {


  private startTime = new Date();
  private endTime = new Date();
  private toppings;

  selectOptions = {
  title: 'Pizza Toppings',
  subTitle: 'Select your toppings',
  inputs: [
      {
        name: 'username',
        placeholder: 'Username'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }
    ]
};

  private monday = false;
  private tuesday = false;
  private wednesday = false;
  private thursday = false;
  private friday = false;
  private saturday = false;
  private sunday = false;


  private selectedCourse;
  private selectedIntructor;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public classService: ClassService,
    public scheduleService: ScheduleService,
    public UserService: UserService,
    public observableCombiner: ObservableCombiner,
    public fb: FirebaseService,
    public alertCtrl: AlertController) {
      

  }

showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Days');

    alert.addInput({
      type: 'checkbox',
      label: 'Alderaan',
      value: 'value1',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Bespin',
      value: 'value2'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        this.toppings = data;
       // this.testCheckboxResult = data;
      }
    });
    alert.present();
  }

  test(){
console.log(this.startTime,this.endTime, this.toppings);

  }

  submit() {

    let entity: ClassModel = new ClassModel();

    entity.setEndDate(this.endTime.getHours, this.endTime.getMinutes);
    entity.setStartDate(this.startTime.getHours, this.startTime.getMinutes);
    entity.addDay('Monday', this.monday);
    entity.addDay('Tuesday', this.tuesday);
    entity.addDay('Wednesday', this.wednesday);
    entity.addDay('Thursday', this.thursday);
    entity.addDay('Friday', this.friday);
    entity.addDay('Saturday', this.saturday);
    entity.addDay('Sunday', this.sunday);

    entity.intructorKey = this.selectedIntructor;
    entity.courseKey = this.selectedCourse;


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


  ngOnDestroy() {
    this.scheduleService.destroy();
    this.UserService.destroy();
    this.classService.destroy();
    this.observableCombiner.destroy();
    this.fb.destroy();
  }

}
