import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';

export class InstructorModel {
    $key: string;
    $exists: () => {};
    name: string;
    Courses: {};

}


@Injectable()
export class InstructorService {

    constructor(private fb: FirebaseService) { }

    public getAllList() {
        return this.fb.getList('/Instructors');//this._af.database.list('/Instructors');
    }
    public getAllObject() {
        return this.fb.getObject('/Instructors');//this._af.database.object('/Instructors');
    }

    public getAllObjectCallBack(cb) {
        this.fb.getObjectCallBack('/Instructors', cb);
    }
    public getAllListCallBack(cb) {
        this.fb.getListCallBack('/Instructors', cb)
    }

    public getSpecificObject(key: string, callback) {
        this.fb.getObjectCallBack('/Instructors/' + key, callback);
    }

    destroy() {
        this.fb.destroy()
    }
}