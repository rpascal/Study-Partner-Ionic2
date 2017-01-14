import {FirebaseService} from './firebase/firebase.service';
import {InstructorInsertService} from './FirebaseDataInjection/instructor-insert.service';
import {CourseInsertService} from './FirebaseDataInjection/course-insert.service';
export const serviceProviders = [InstructorInsertService, CourseInsertService];