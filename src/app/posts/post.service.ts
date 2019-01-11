import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Post } from '../datatypes';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable()
export class PostService {
  private postsRef: AngularFireList<any>;
  private db: AngularFireList<any>;
  private posts;
  private postsPerPage = 5;
  private endpoint: string;
  public morePosts = true;

  constructor(private afDb: AngularFireDatabase) {}

  setEndpoint(endpoint: string) {
    this.endpoint = endpoint;
    const date = new Date().getTime();
    this.postsRef = this.afDb.list(`/${endpoint}`);
    this.db = this.afDb.list(`/${endpoint}`, ref =>
      ref.orderByChild('inverseDate').startAt(-date)
    );
  }

  create(title: string, body: string, date: number): Observable<any> {
    return from(
      this.postsRef.push({
        title,
        body,
        date,
        inverseDate: -date
      })
    );
  }

  createOrUpdate(key, { title, body, date, image }): Observable<any> {
    const post = {
      title,
      body,
      date,
      image: image || null,
      inverseDate: -date
    };
    if (key) {
      return from(this.postsRef.update(key, post));
    } else {
      return from(this.postsRef.push(post));
    }
  }

  update(id: any, title: string, body: string, date: number): Observable<any> {
    return from(
      this.postsRef.update(id, { title, body, date, inverseDate: -date })
    );
  }

  remove(key) {
    if (key) this.postsRef.remove(key);
  }

  nextPage(): Observable<Post[]> {
    return this.db.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );
  }

  getAllPosts(): Observable<Post[]> {
    return this.afDb
      .list(`/${this.endpoint}`, ref => ref.orderByChild('inverseDate'))
      .valueChanges();
  }

  getSinglePost(id: string): Observable<Post> {
    return this.afDb
      .object(`/${this.endpoint}/${id}`)
      .valueChanges()
      .pipe(
        map((post: Post) => {
          if (post) post.key = id;
          return post;
        })
      );
  }
}
