import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ReplaySubject }  from 'rxjs';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { AppSettings } from '../app-settings';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
  private user;
  authSubject = new ReplaySubject<Object>();

  constructor(private af: AngularFire) {
    this.initFirebase();
  }

  initFirebase() {
    this.af.auth.subscribe(auth => {
       this.user = auth;
       this.authSubject.next({user: auth, admin: this.isAdmin(_.get(auth, 'uid', null))});
    });
  }

  getUser() {
    return this.user;
  }

  getAuth() {
    return this.authSubject;
  }

  isUserAdmin() {
    return this.isAdmin(_.get(this.user, 'uid', null));
  }

  private isAdmin(uid) {
    return uid ?
      _.indexOf(AppSettings.ADMINS, uid) !== -1 :
      false;
  }

  login() {
    this.af.auth.login();
  }

  logout() {
    this.af.auth.logout();
  }
}
