import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import {  FirebaseAuthState } from 'angularfire2';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseService {

  constructor(public af: AngularFire) { }

  private subscriptions: Array<any> = [];


  login(username: string, password: string) {
    return this.af.auth.login({ email: username, password: password });
  }
  logOut(): void {
    this.af.auth.logout();
  }

  loggedInStateCallback(callback) {
    let sub = this.af.auth.map((authState: FirebaseAuthState) => !!authState).subscribe(callback);
    this.subscriptions.push(sub);
  }


  getAuthCallback(callback) {
    let sub = this.af.auth.subscribe(callback);
    this.subscriptions.push(sub);
  }
  getAuth() {
    return this.af.auth;
  }


  getList(path): FirebaseListObservable<any> {
    return this.af.database.list(path);
  }
  getListCallBack(path, callBack) {
    let sub = this.getList(path).subscribe(callBack);
    this.subscriptions.push(sub);
  }
  getListQuery(path, query): FirebaseListObservable<any> {
    return this.af.database.list(path, query);
  }
  getListQueryCallBack(path, query, callBack) {
    let sub = this.getListQuery(path, query).subscribe(callBack);
    this.subscriptions.push(sub);
  }

  getObject(path): FirebaseObjectObservable<any> {
    return this.af.database.object(path);
  }
  getObjectCallBack(path, callBack) {
   // console.log('obnject', path)
    let sub = this.getObject(path).subscribe(callBack);
    this.subscriptions.push(sub);
  }
  getObjectQuery(path, query): FirebaseObjectObservable<any> {
    return this.af.database.object(path, query);
  }
  getObjectQueryCallBack(path, query, callBack) {
    let sub = this.getObjectQuery(path, query).subscribe(callBack);
    this.subscriptions.push(sub);
  }



  push(path, value): string {
    return this.af.database.list(path).push(value).key;
  }
  update(path: string, key: string, newStuff) {
    const submitStuff = newStuff;
    return this.getList(path).update(key, submitStuff);
  }
  delete(path: string) {
    this.getList(path).remove().then(_ => console.log('deleted!'));
  }

  destroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

}


