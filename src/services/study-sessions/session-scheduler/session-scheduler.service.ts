import { Injectable } from '@angular/core';
import { SessionService } from '../session/session.service'
import { PersonalSessionsService } from '../personal-sessions/personal-sessions.service'
import { UserService } from '../../user-service/user.service'
@Injectable()
export class SessionSchedulerService {

  constructor(public ss: SessionService,
    public pss: PersonalSessionsService,
    public us: UserService) {

  }

  schedule(user): void {
    let key = this.ss.add(user);
    user.members.forEach(mem => {
      this.us.getSpecific(mem, us => {
        this.pss.update(us, key);
      });
    });
  }

  destroy() {
    this.ss.destroy();
    this.pss.destroy();
    this.us.destroy();
  }

}
