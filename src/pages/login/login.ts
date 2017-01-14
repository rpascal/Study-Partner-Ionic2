import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { TabsPage } from '../tabs/tabs'
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  registerCredentials = {email: '', password: ''};
  loading: Loading;


  constructor(private nav: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private fb: FirebaseService) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(form) {
    this.showLoading();

    this.fb.login(this.registerCredentials.email,
      this.registerCredentials.password).then(allowed => {
        if (allowed) {
          setTimeout(() => {
            this.loading.dismiss();
            this.nav.setRoot(TabsPage, { tabIndex: 0 })
          });
        } else {
          this.showError("Access Denied");
        }
      }).catch(err => {
        this.showError(err);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  onSignup() {
    //this.navCtrl.push(SignupPage);
  }

}
