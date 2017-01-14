import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';

const firebaseConfig = {
    apiKey: "AIzaSyCxTSrxbzm68Yrd6WKAAKHelMSeeQZ0j_w",
    authDomain: "study-partner.firebaseapp.com",
    databaseURL: "https://study-partner.firebaseio.com",
    storageBucket: "study-partner.appspot.com",
    messagingSenderId: "170967172678"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

export const firebaseConifg = AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig);