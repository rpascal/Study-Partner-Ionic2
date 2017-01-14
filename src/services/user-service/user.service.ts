import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';

export class UserModel {
    $key: string;
    $exists: () => {};
    age: string;
    color: string;
    name: string;
    schedule: string;
    personalsessions: string;
}

@Injectable()
export class UserService {


    constructor(private fb: FirebaseService) { }


    getCurrentUserCallback(cb) {
        this.fb.getAuthCallback(authState =>{
            this.fb.getObjectCallBack('/User/' + authState.uid, cb)
        });
    }

    getAllListCallback(callBack) {
        this.fb.getListCallBack('/User', callBack);
    }
    getAllObjectCallback(callBack) {
        this.fb.getObjectCallBack('/User', callBack);
    }
    getAllList() {
        return this.fb.getList('User');
    }

    getAllObject() {
        return this.fb.getObject('User');
    }

    getSpecific(key: string, callback) {
        this.fb.getObjectCallBack('User/' + key, callback);
    }


    updateUser(newUser: UserModel): void {
        let key = newUser.$key;
        delete newUser.$key;
        delete newUser.$exists;
        this.fb.update('/User',key,newUser)
        //this._af.database.list('/User').update(key, newUser);
    }

    destroy() {
        this.fb.destroy();
    }

}