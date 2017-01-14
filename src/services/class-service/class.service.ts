import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';


export class ClassModel {
    $key: string;
    $exists: () => {};
    userKey: string;
    intructorKey: string;
    courseKey: string;
    startDate: string;
    endDate: string;
    Days: {} = {};

    public addDay(key, value) {
        this.Days[key] = value;
    }

    public getStartDate(): Date {
        return new Date(this.startDate);
    }
    public getEndDate(): Date {
        return new Date(this.endDate);
    }
    public setStartDate(hour, min) {
        this.startDate = new Date(2000, 1, 1, hour, min, 0, 0).toString();
    }
    public setEndDate(hour, min) {
        this.endDate = new Date(2000, 1, 1, hour, min, 0, 0).toString();
    }

}

export class timeFrame {
    private startDate: string;
    private endDate: string;

    public getStartDate(): Date {
        return new Date(this.startDate);
    }
    public getEndDate(): Date {
        return new Date(this.endDate);
    }
    public setStartDate(hour, min) {
        // date.setFullYear(2000);
        // date.setMonth(1);
        // date.setSeconds(0);
        // date.setUTCDate(5);
        // date.setMilliseconds(0);
        this.startDate = new Date(2000, 1, 1, hour, min, 0, 0).toString();
    }
    public setEndDate(hour, min) {
        // date.setFullYear(2000);
        // date.setMonth(1);
        // date.setSeconds(0);
        // date.setUTCDate(5);
        // date.setMilliseconds(0);
        this.endDate = new Date(2000, 1, 1, hour, min, 0, 0).toString();
    }




}

@Injectable()
export class ClassService {

    constructor(private fb: FirebaseService) { }

    getAllListCallback(cb) {
        this.fb.getListCallBack('/Class/', cb)
    }
    getAllObjectCallback(cb) {
        this.fb.getObjectCallBack('/Class/', cb)
    }

    public getAllList() {
        return this.fb.getList('/Class');
    }
    public getAllObject() {
        return this.fb.getObject('/Class');
    }

    public deleteClass(key: string) {
        this.fb.delete('Class/' + key);
    }


    public add(entity: ClassModel, allClasses: Array<any>): string {
        // console.log(allClasses)
        const existing = allClasses &&
            allClasses.length &&
            allClasses.find(ee => {
                // console.log(ee);
                let e: ClassModel = new ClassModel();
                e.setStartDate(new Date(ee.startDate).getHours(), new Date(ee.startDate).getMinutes());
                e.setEndDate(new Date(ee.endDate).getHours(), new Date(ee.endDate).getMinutes());
                e.Days = ee.Days;
                e.courseKey = ee.courseKey;
                e.intructorKey = ee.intructorKey


                let days = e.Days['Monday'] === entity.Days['Monday'] &&
                    e.Days['Tuesday'] === entity.Days['Tuesday'] &&
                    e.Days['Wednesday'] === entity.Days['Wednesday'] &&
                    e.Days['Thursday'] === entity.Days['Thursday'] &&
                    e.Days['Friday'] === entity.Days['Friday'] &&
                    e.Days['Saturday'] === entity.Days['Saturday'] &&
                    e.Days['Sunday'] === entity.Days['Sunday'];
                return e.getStartDate().getHours() == entity.getStartDate().getHours() &&
                    e.getEndDate().getHours() == entity.getEndDate().getHours() &&
                    e.getStartDate().getMinutes() == entity.getStartDate().getMinutes() &&
                    e.getEndDate().getMinutes() == entity.getEndDate().getMinutes()
                    && days &&
                    e.courseKey == entity.courseKey &&
                    e.intructorKey == entity.intructorKey;

            }
            );
        if (existing) {
            console.log('FOUND:', existing.$key);
            entity.$key = existing.$key;
        }

        delete entity.$exists;

        //  console.log(existing,entity)
        //  update or create?
        if (entity.$key) {
            const key = entity.$key; // temporary save our key!

            let tempUser = {};
            tempUser[entity.userKey] = true;
            delete entity.userKey;

            delete entity.$key; // we dont want to push this into our firebase-database ..
            this.fb.update('/Class', key, entity);
            this.fb.update('/Class', key + '/Users/', tempUser);
            return key;
        }
        else {
            let tempUser = {};
            tempUser[entity.userKey] = true;
            delete entity.userKey;
            // create ..
            let key = this.fb.push('Class', entity);
            this.fb.update('/Class', key + '/Users/', tempUser);
            return key;
        }

    }
    destroy() {
        this.fb.destroy();
    }
}