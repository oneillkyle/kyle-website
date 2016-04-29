//import deps
import 'es6-shim';
import 'rxjs/Rx';
import 'tether';
// import 'jquery';
import './scss/styles.scss!';

import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {enableProdMode} from 'angular2/core';

enableProdMode();
bootstrap(AppComponent);
