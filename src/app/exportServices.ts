import { ClassService } from '../services/class-service/class.service';
import { FirebaseService } from '../services/firebase/firebase.service'
import { ScheduleService } from '../services/schedule-service/schedule.service';
import { UserService } from '../services/user-service/user.service';
import { InstructorService } from '../services/instructorService/instructor.service';
import { CourseService } from '../services/courseService/course.service';
import { SessionSchedulerService } from '../services/study-sessions/session-scheduler/session-scheduler.service';
import { SessionService } from '../services/study-sessions/session/session.service';
import { PersonalSessionsService } from '../services/study-sessions/personal-sessions/personal-sessions.service';
import { ObservableCombiner } from '../services/ObservableCombiner/observable-combiner.service'

export class services {
  static getServices() {
    return [
      ObservableCombiner,
      FirebaseService,
      PersonalSessionsService,
      SessionService,
      SessionSchedulerService,
      CourseService,
      InstructorService,
      ClassService,
      ScheduleService,
      UserService
    ];
  }
}
