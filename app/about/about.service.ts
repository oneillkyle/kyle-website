import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Post} from '../posts/post';
import {FirebaseCreds} from '../firebase';

declare var firebase: any;

@Injectable()
export class AboutService {

    private db;
    private posts;
    constructor() {
        this.db = firebase.database().ref('/about');
    }

    set(title: string, body: string, date: number): void {
        let ref = this.db.set({
            title,
            body,
            date
        });
    }

    get(): Observable<Post> {
        return Observable.create(observer => {
            this.db
                .once('value', snapshot => {
                    let data = snapshot.val();
                    let post = new Post(
                        snapshot.key,
                        snapshot.getPriority(),
                        data.title,
                        data.body,
                        data.date
                    );

                    observer.next(post);
                }, observer.error);
            });
    }

}
