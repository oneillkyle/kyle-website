import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { User } from '../datatypes';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
  private user: User;
  authSubject = new BehaviorSubject({});

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) {
    this.initFirebase();
  }

  initFirebase() {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.db.object('/users/' + auth.uid).valueChanges().subscribe(response => {
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
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
