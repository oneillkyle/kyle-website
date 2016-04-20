import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Post} from './post';
import {LocalSettings} from '../../local-settings';

@Injectable()
export class PostService {

    private db;
    private posts;
    private postsPerPage: number = 5;
    private url = LocalSettings.firebase + "/posts";

    constructor() {
        this.db = new Firebase(this.url);
    }

    create(title: string, body: string, date: number): void {
        let priority = 0 - date;
        let ref = this.db.push({
            title,
            body,
            date
        });
        ref.setPriority(priority);
    }

    getAll(): Observable<Post> {
        return Observable.create(observer => {
            let listener = this.db.on('child_added', snapshot => {
                let data = snapshot.val();
                observer.next(new Post(
                    snapshot.key(),
                    data.title,
                    data.body,
                    data.date
                    ));
            }, observer.error);

            return () => {
                this.db.off('child_added', listener);
            };
        });
    }

    nextPage(): Observable<Post[]> {
        let lastPost = this.posts ? this.posts[this.posts.length -1].id : undefined;
        return Observable.create(observer => {
            this.db
                .startAt(null, lastPost)
                .limitToFirst(this.postsPerPage + (lastPost ? 1 : 0))
                .once('value', snapshot => {
                    let posts = [];
                    snapshot.forEach(snap => {
                        let data = snap.val();
                        posts.push(new Post(
                            snapshot.key(),
                            data.title,
                            data.body,
                            data.date
                        ));
                    });

                    lastPost && posts.shift();
                    if(posts.length > 0){
                        this.posts = posts;
                    }
                    observer.next(this.posts);
                }, observer.error);
            });
    }

    previousPage(): Observable<Post[]> {
        let firstPost = this.posts[0];
        return Observable.create(observer => {
            this.db
                .endAt(null, firstPost)
                .limitToFirst(this.postsPerPage + 1)
                .once('value', snapshot => {
                    let posts = [];
                    snapshot.forEach(snap => {
                        let data = snap.val();
                        posts.push(new Post(
                            snapshot.key(),
                            data.title,
                            data.body,
                            data.date
                        ));
                    });

                    posts.pop();
                    this.posts = posts;
                    observer.next(posts);
                }, observer.error);
            });
    }

}
