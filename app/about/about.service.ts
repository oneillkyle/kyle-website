import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Post} from '../posts/post';
import {LocalSettings} from '../../local-settings';

@Injectable()
export class PostService {

    private db;
    private posts;
    private url = LocalSettings.firebase + '/about';

    constructor() {
        this.db = new Firebase(this.url);
    }

    create(title: string, body: string): void {
        this.db.push({
            title,
            body,
        });
    }

    getAll(): Observable<Post> {
        return Observable.create(observer => {
            let listener = this.db.on('child_added', snapshot => {
                let data = snapshot.val();
                observer.next(new Post(
                    snapshot.key(),
                    data.title,
                    data.body
                    ));
            }, observer.error);

            return () => {
                this.db.off('child_added', listener);
            };
        });
    }

}
