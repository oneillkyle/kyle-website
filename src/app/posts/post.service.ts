import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Post} from './post';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class PostService {
  private db;
  private posts;
  private postsPerPage: number = 5;
  public morePosts = true;

  constructor(private af: AngularFire) {
    this.db = this.af.database.list('/posts');
  }

  create(title: string, body: string, date: number): Observable<any> {
    return this.db.push({
      title,
      body,
      date
    });
  }

  createOrUpdate(key, {title, body, date}): Observable<any> {
    if (key) {
      return this.db.update(key, {title, body, date});
    } else {
      return this.db.push(title, body, date);
    }
  }

  update(id: any, title: string, body: string, date: number): Observable<any> {
    return this.db.update(id, {title, body, date});
  }

  nextPage(): FirebaseListObservable<Post[]> {
    return this.db;
  }

}
