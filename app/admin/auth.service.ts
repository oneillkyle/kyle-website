import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Subject }  from 'rxjs/Subject';

import { AppSettings } from '../app-settings';
declare var firebase: any;
declare var _: any;

@Injectable()
export class AuthService {
    private authObserver;
    private user;
    authObservable: Observable<Object>;
    authSubject = new Subject<Object>();

    constructor(private _ngZone: NgZone) {
        this.authObserver = this.createAuthObservable();
        this.initFirebase();
    }

    private createAuthObservable(){
        this.authObservable = this.authSubject.asObservable();
    }

    initFirebase(){
        firebase.auth().onAuthStateChanged(user => {
            this.user = user;
            this.emitUser();
        }, error => {
            console.log(error);
        });
    }

    getUser(){
        return firebase.auth().currentUser;
    }

    authSubscribe(){
        return this.authObservable;
    }

    isAdmin(){
        // return false;
        return this.user ?
            _.indexOf(AppSettings.ADMINS, this.user.uid) !== -1 :
            false;
    }

    emitUser() {
        this._ngZone.run(() => this.authSubject.next({user: this.user, admin: this.isAdmin()}));
    }

    signOut(){
        firebase.auth().signOut();
    }

}
