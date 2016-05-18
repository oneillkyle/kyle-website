import 'es6-shim';

import 'reflect-metadata';
import '../public/app/css/styles.css!';

import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {enableProdMode} from '@angular/core';

enableProdMode();
bootstrap(AppComponent);
