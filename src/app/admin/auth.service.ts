import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFire } from 'angularfire2';

import { User } from '../datatypes';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
  private user: User;
  authSubject = new BehaviorSubject({});

  constructor(private af: AngularFire) {
    this.initFirebase();
  }

  initFirebase() {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.af.database.object('/users/' + auth.uid).subscribe(response => {
          this.user = new User(response);
          this.user.uid = auth.uid;
          this.authSubject.next(this.user);
        });
      } else {
        this.user = undefined;
        this.authSubject.next(this.user);
      }
    });
  }

  getUser() {
    return this.user;
  }

  getAuth() {
    return this.authSubject;
  }

  isUserAdmin() {
    return _.get(this.user, 'admin', false);
  }

  login() {
    this.af.auth.login();
  }

  logout() {
    this.af.auth.logout();
  }
}
