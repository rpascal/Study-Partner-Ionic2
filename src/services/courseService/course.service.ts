import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';

export class CourseModel {
    $key: string;
    $exists: () => {};
    course: string;
    department: string;
    title: string;
    Instructors: {};

}


@Injectable()
export class CourseService {

    constructor(private fb: FirebaseService) { }


    public getAllList() {
        return this.fb.getList('/Courses');
    }
    public getAlObject() {
        return this.fb.getObject('/Courses');
    }
    public getAllObjectCallBack(cb) {
        this.fb.getObjectCallBack('/Courses', cb)
    }
    public getAllListCallBack(cb) {
        this.fb.getListCallBack('/Courses', cb)
    }
    public getSpecificObject(key: string, callback) {
        this.fb.getObjectCallBack('/Courses/' + key, callback)
    }

    destroy() {
        this.fb.destroy()
    }


}