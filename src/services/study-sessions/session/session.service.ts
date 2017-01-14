import { Injectable, OnDestroy } from '@angular/core';
import { FirebaseService } from '../../firebase/firebase.service'


@Injectable()
export class SessionService {
    constructor(private fb: FirebaseService) {}

    public add(value): string {

        const add : {} =[];
        add['start'] = value.start;
        add['end'] = value.end;
        add['classKey'] = value.classKey;
        add['owner'] = value.owner;
        add['memebers'] = {};
        value.members.forEach(mem =>{
            var status =  (mem === value.owner)? "yes" : "pending";           
            add['memebers'][mem] = {status : status}
        });
        let key = this.fb.push('Session', add);//this._af.database.list('Session').push(add).key;

        return key;
    }

    destroy() {
        this.fb.destroy();
    }


}