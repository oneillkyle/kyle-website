import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FirebaseCreds} from '../firebase';

@Injectable()
export class AdminService {
    private db;

    constructor() {
        this.auth = firebase.auth();
        this.provider = new firebase.auth.GoogleAuthProvider();
        this.authSubscriber = this.createAuthObserver();
    }

    login(): Observable {
        return Observable.create(observer => {
            this.auth.signInWithPopup(this.provider)
                .then(result => {
                    console.log(result)
                    this.isAdmin(result.user.uid, (isAdmin) => {
                        observer.next({
                            auth: true,
                            isAdmin: isAdmin
                        })
                    });
                }).catch(error => {
                    console.log(error);
                    return observer.next({ auth: false });
                });
            });
    }

    isAdmin(uid, cb) {
        firebase.database().ref('/groups/admin').once('value', snapshot => {
            cb(snapshot.child(uid).exists());
        },
        err => {
            cb(false);
        });
    }

    private createAuthObserver() {
        return Observable.create(observer =>{
            this.authObserver = observer;

            this.auth.onAuthStateChanged(user => {
                this.user = user;
                this.checkAuth();
                console.log(this.user);
            });
        });
    }

    private checkAuth() {
        if (!this.user) {
            return this.authObserver.next({ auth: false, isAdmin: false });
        }
        this.isAdmin(this.user.uid, (isAdmin) => {
            this.authObserver.next({
                auth: true,
                isAdmin: isAdmin
            })
        });
    }

    getAuth() {
        return this.authSubscriber;
    }

    logout() {
        this.auth.signOut();
    }
}
