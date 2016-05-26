import 'es6-shim';

import 'reflect-metadata';
import '../public/app/css/styles.css!';

import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {enableProdMode} from '@angular/core';

// var config = {
// 	apiKey: "AIzaSyDcm-LHDUJC990Cez9xGS1MO5opWqDUqPs",
// 	authDomain: "blinding-torch-7293.firebaseapp.com",
// 	databaseURL: "https://blinding-torch-7293.firebaseio.com",
// 	storageBucket: "blinding-torch-7293.appspot.com",
// };

// firebase.initializeApp(config);

enableProdMode();
bootstrap(AppComponent);
