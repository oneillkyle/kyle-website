import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from '../datatypes';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class PostService {
  private db;
  private posts;
  private postsPerPage = 5;
  public morePosts = true;

  constructor(private af: AngularFire) {
    const date = new Date().getTime();
    this.db = this.af.database.list('/posts', {
      query: {
        orderByChild: 'inverseDate',
        startAt: -date
      }
    });
  }

  create(title: string, body: string, date: number): Observable<any> {
    return this.db.push({
      title,
      body,
      date,
      inverseDate: -date
    });
  }

  createOrUpdate(key, { title, body, date }): Observable<any> {
    if (key) {
      return this.db.update(key, { title, body, date, inverseDate: -date });
    } else {
      return this.db.push({ title, body, date, inverseDate: -date });
    }
  }

  update(id: any, title: string, body: string, date: number): Observable<any> {
    return this.db.update(id, { title, body, date, inverseDate: -date });
  }

  remove(key) {
    if (key) this.db.remove(key);
  }

  nextPage(): FirebaseListObservable<Post[]> {
    return this.db;
  }

  getAllPosts(): FirebaseListObservable<Post[]> {
    return this.af.database.list('/posts', {
      query: {
        orderByChild: 'inverseDate'
      }
    });
  }

}
