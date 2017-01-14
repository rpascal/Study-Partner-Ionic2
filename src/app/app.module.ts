import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

 import { MyApp } from './app.component';

import { firebaseConifg } from '../firebase/firebase-config';

import {pages} from './exportPages';
import {services} from './exportServices';



@NgModule({
  declarations: [
    MyApp,
    pages.getPages()
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    firebaseConifg
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    pages.getPages()
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
    services.getServices()]
})
export class AppModule { }



