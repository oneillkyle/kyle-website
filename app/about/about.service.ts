import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Post} from '../posts/post';
import {LocalSettings} from '../../local-settings';

@Injectable()
export class AboutService {

    private db;
    private posts;
    private url = LocalSettings.firebase + '/about';

    constructor() {
        this.db = new Firebase(this.url);
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
                        snapshot.key(),
                        data.title,
                        data.body,
                        data.date
                    );

                    observer.next(post);
                }, observer.error);
            });
    }

}
