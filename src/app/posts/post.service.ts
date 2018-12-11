import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../datatypes';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';

@Injectable()
export class PostService {
  private postsRef: AngularFireList<any>;
  private db: AngularFireList<any>;
  private posts;
  private postsPerPage = 5;
  public morePosts = true;

  constructor(
    private afDb: AngularFireDatabase
  ) {
    const date = new Date().getTime();
    this.postsRef = this.afDb.list('/posts');
    this.db = this.afDb.list('/posts',
      ref => ref.orderByChild('inverseDate').startAt(-date)
    );
  }

  create(title: string, body: string, date: number): Observable<any> {
    return Observable.fromPromise(this.postsRef.push({
      title,
      body,
      date,
      inverseDate: -date
    }));
  }

  createOrUpdate(key, { title, body, date, image }): Observable<any> {
    const post = { title, body, date, image: image || null, inverseDate: -date }
    if (key) {
      return  Observable.fromPromise(this.postsRef.update(key, post));
    } else {
      return  Observable.fromPromise(this.postsRef.push(post));
    }
  }

  update(id: any, title: string, body: string, date: number): Observable<any> {
    return Observable.fromPromise(this.postsRef.update(id, { title, body, date, inverseDate: -date }));
  }

  remove(key) {
    if (key) this.postsRef.remove(key);
  }

  nextPage(): Observable<Post[]> {
    return this.db.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getAllPosts(): Observable<Post[]> {
    return this.afDb.list('/posts', ref => ref.orderByChild('inverseDate')).valueChanges();
  }

  getSinglePost(id: string): Observable<Post> {
    return this.afDb.object(`/posts/${id}`).valueChanges().map((post: Post) => {
      if (post) post.key = id;
      return post;
    });
  }

}
