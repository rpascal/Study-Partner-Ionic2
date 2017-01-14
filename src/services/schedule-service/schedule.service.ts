import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service'


@Injectable()
export class ScheduleService {


  constructor(private fb: FirebaseService) { }

  getCurrentUsersScheduleCallback(cb) {
    this.fb.getAuthCallback(auth => {
      this.fb.getObjectCallBack('/Schedule/' + auth.uid, cb)
    })
  }

  getAllListCallback(cb) {
    this.fb.getListCallBack('/Schedule', cb)
  }
  getAllObjectCallback(cb) {
    this.fb.getObjectCallBack('/Schedule', cb)
  }

  public getAllObject() {
    return this.fb.getObject('/Schedule');
  }

  public getAllList() {
    return this.fb.getList('/Schedule');
  }

  public getSpecificObject(key) {
    return this.fb.getObject('/Schedule/' + key);
  }
  public getSpecificList(key) {
    return this.fb.getList('/Schedule/' + key);
  }

  public deleteClassFromSpecific(scheduleKey: string, classKey: string) {
    this.fb.delete('Schedule/' + scheduleKey + '/' + classKey);
  }



  public checkExist(userID: string, schedule, classKey: string): boolean {
    for (var property in schedule) {
      if (schedule[property].hasOwnProperty(classKey) && property != userID) {
        return true;
      }
    }
    return false;
  }


  public update(userKey: string, classKey: string) {
    let submit = {};
    submit[classKey] = true;
    this.fb.update('Schedule', userKey, submit);
  }


  destroy() {
    this.fb.destroy();
  }

}