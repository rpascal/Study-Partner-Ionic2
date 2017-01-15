import { Component } from '@angular/core';

import { ViewController, NavController, App, ModalController } from 'ionic-angular';

//import { SupportPage } from '../support/support';
import { AddClassPage } from '../add-class/add-class'

@Component({
    template: `
      <button ion-item (click)="addClass()">Add Class</button>
  `
})
export class PopoverPage {

    constructor(
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public app: App,
        public modalCtrl: ModalController
    ) { }


    addClass() {
        this.navCtrl.push(AddClassPage)
    }


}