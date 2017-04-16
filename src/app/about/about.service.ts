import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from '../datatypes';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class AboutService {

    private db;
    private posts;
    constructor(private af: AngularFire) {
        this.db = this.af.database.object('/about');
    }

    set({ title, body, date }): void {
        this.db.set({
            title,
            body,
            date
        });
    }

    get(): FirebaseObjectObservable<Post> {
        return this.db;
    }

}
