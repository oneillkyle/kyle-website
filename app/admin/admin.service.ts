import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {LocalSettings} from '../../local-settings';

@Injectable()
export class AdminService {
    private db;
    private url = LocalSettings.firebase;

    constructor() {
        this.db = new Firebase(this.url);
    }

    login(): Observable {
        return Observable.create(observer => {
            this.db.authWithOAuthPopup("google", (error, authData) => {
                if(error){
                    return observer.next({auth: false});
                }
                this.isAdmin(authData.uid, (isAdmin) => {
                    observer.next({
                        auth: true,
                        isAdmin: isAdmin
                    })
                });
            }, {
              remember: "sessionOnly",
            });
        });
    }

    isAdmin(uid, cb) {
        let db = new Firebase(this.url + '/groups/admin');
        db.once('value', snapshot => {
            cb(snapshot.child(uid).exists());
        },
        err => {
            cb(false);
        });
    }

    getAuth() {
        return Observable.create(observer =>{
            let auth = this.db.getAuth();
            if(!auth){
                return observer.next({auth: false, isAdmin:false});
            }
            this.isAdmin(auth.uid, (isAdmin) => {
                observer.next({
                    auth: true,
                    isAdmin: isAdmin
                })
            });
        });
    }

    logout() {
        this.db.unauth();
    }
}
