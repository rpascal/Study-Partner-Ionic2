import { Injectable, OnDestroy } from '@angular/core';
import { FirebaseService } from '../../firebase/firebase.service'


@Injectable()
export class PersonalSessionsService {


  constructor(private fb: FirebaseService) {  }

  public update(user, key: string) {
    if (!!user.personalsessions) {
      let submit = {};
      submit[key] = true;
      this.fb.update('PersonalSession', user.personalsessions, submit);
    } else {
      let submit = {};
      submit[key] = true;
      let innerKey = this.fb.push('PersonalSession', submit);
      let submit2 = {};
      submit2[innerKey] = true;
      this.fb.update('User', user.$key, { personalsessions: innerKey });

    }
  }

  destroy() {
    this.fb.destroy();
  }

}