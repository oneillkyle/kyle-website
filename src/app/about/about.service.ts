import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from '../datatypes';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AboutService {

    private posts;
    constructor(private db: AngularFireDatabase) {
    }

    set({ title, body, date }): void {
        this.db.object('/about').set({
            title,
            body,
            date
        });
    }

    get(): Observable<Post> {
        return this.db.object('/about').valueChanges();
    }

}
