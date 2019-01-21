import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { BookRating } from '../datatypes';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable()
export class BookListService {
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

  create(rating: BookRating): Observable<any> {
    return from(
      this.postsRef.push({
        ...rating,
        inverseDate: -rating.date
      })
    );
  }

  createOrUpdate(rating: BookRating): Observable<any> {
    const key = rating.key;
    const book = {
      ...rating,
      image: rating.image || null,
      inverseDate: -rating.date
    };
    delete book.key;
    if (key) {
      return from(this.postsRef.update(key, book));
    } else {
      return from(this.postsRef.push(book));
    }
  }

  update(key, rating: BookRating): Observable<any> {
    return from(
      this.postsRef.update(key, {
        ...rating,
        inverseDate: -rating.date
      })
    );
  }

  remove(key) {
    if (key) this.postsRef.remove(key);
  }

  nextPage(): Observable<BookRating[]> {
    return this.db.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val() }));
      })
    );
  }

  getAllPosts(): Observable<{}[]> {
    return this.afDb
      .list(`/${this.endpoint}`, ref => ref.orderByChild('inverseDate'))
      .valueChanges();
  }

  getSinglePost(key: string): Observable<BookRating> {
    return this.afDb
      .object(`/${this.endpoint}/${key}`)
      .valueChanges()
      .pipe(
        map((post: BookRating) => {
          if (post) post.key = key;
          return post;
        })
      );
  }
}
