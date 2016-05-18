import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Post} from './post';
import {FirebaseCreds} from '../firebase';

@Injectable()
export class PostService {

    private db;
    private posts;
    private postsPerPage: number = 5;
    private url = FirebaseCreds.url + "/posts";
    public morePosts = true;

    constructor() {
        this.db = new Firebase(this.url);
    }

    create(title: string, body: string, date: number): Observable {
        return Observable.create(observer => {
            let priority = 0 - date;
            let ref = this.db.push({
                title,
                body,
                date
            });
            ref.setPriority(priority);
            observer.next({ id: ref.key(), status: 201 });
        }
    }

    createOrUpdate(id: any, title: string, body: string, date: number): Observable {
        if(id){
            return this.update(id, title, body, date);
        } else {
            return this.create(title, body, date);
        }
    }

    update(id: any, title: string, body: string, date: number): Observable {
        return Observable.create(observer => {
            this.db.child(id).set({ title: title, body: body }, error => {
                if (error) {
                    observer.next({ error: error });
                } else {
                    observer.next({ status: 200 });
                }
            });
        });
    }

    getAll(): Observable<Post> {
        return Observable.create(observer => {
            let listener = this.db.on('child_added', snapshot => {
                let data = snapshot.val();
                observer.next(new Post(
                    snapshot.key(),
                    snapshot.priority(),
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

    getCount(): Observable<number> {
        return Observable.create(observer => {
            this.db
                .once('value', snapshot => {
                    observer.next(snapshot.numChildren());
                }, observer.error);
            });
    }

    nextPage(): Observable<Post[]> {
        let lastPost = this.posts ? this.posts[this.posts.length -1].priority : undefined;
        return Observable.create(observer => {
            this.db
                .orderByPriority()
                .startAt(lastPost || null)
                .limitToFirst(this.postsPerPage + (lastPost ? 1 : 0))
                .once('value', snapshot => {
                    let posts = [];
                    snapshot.forEach(snap => {
                        let data = snap.val();
                        posts.push(new Post(
                            snap.key(),
                            snap.getPriority(),
                            data.title,
                            data.body,
                            data.date
                        ));
                    });

                    lastPost && posts.shift();
                    this.posts = posts;

                    if(posts.length < this.postsPerPage){
                        this.morePosts = false;
                    }
                    observer.next(this.posts);
                }, observer.error);
            });
    }

    previousPage(): Observable<Post[]> {
        let firstPost = this.posts[0].priority;
        return Observable.create(observer => {
            this.db
                .orderByPriority()
                .endAt(firstPost)
                .limitToFirst(this.postsPerPage + 1)
                .once('value', snapshot => {
                    let posts = [];
                    snapshot.forEach(snap => {
                        let data = snap.val();
                        posts.push(new Post(
                            snap.key(),
                            snap.getPriority(),
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
