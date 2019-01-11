import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../datatypes';
import { AngularFireDatabase } from '@angular/fire/database';

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
