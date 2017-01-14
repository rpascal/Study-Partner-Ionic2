import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import {Observable} from 'rxjs/Rx'


@Injectable()
export class ObservableCombiner {

    private subscriptions: Array<any> = [];

    constructor() { }

    public combineObservables(observables: Array<Observable<any>>, callback) {
        let sub = Observable.combineLatest(observables).subscribe(callback);
        this.subscriptions.push(sub);
    }
    public combineObservablesWithTake1(observables: Array<Observable<any>>, callback) {
        let sub = Observable.combineLatest(observables).take(1).subscribe(callback);
        this.subscriptions.push(sub);
    }

    destroy() {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        })
    }

}