import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';

import { AuthService } from '../../admin/auth.service';
import { BookRating } from '../../datatypes';

import { BookListService } from '../book-list.service';
import { BookEditComponent } from '../book-edit/book-edit.component';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
  providers: []
})
export class BookViewComponent implements OnInit {
  public books: Observable<BookRating[]>;
  public book: BookRating;
  public enableEdit = false;
  public morePosts = false;
  public creatingPost = false;

  user;
  admin;
  authSub;

  constructor(
    private route: ActivatedRoute,
    private bookListService: BookListService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
    });
    this.bookListService.setEndpoint('book-list');
    this.getUser();
    this.nextPage();
  }

  getUser() {
    this.authSub = this.authService.getAuth().subscribe(user => {
      this.user = user;
      // if (_.get(this.user, 'admin')) this.posts = this.bookListService.getAllPosts();
    });
  }

  getAllPosts() {
    this.book = null;
    this.nextPage();
  }

  createOrUpdateBook(book: BookRating) {
    this.bookListService.createOrUpdate(book);
  }

  deleteBook(book) {
    this.bookListService.remove(book.key);
  }

  nextPage() {
    this.books = this.bookListService.nextPage().pipe(
      map((books) => {
        let currentYear;
        let bookDate;
        const bookReduce = books.reduce((bookList, book) => {
          bookDate = new Date(book.date);
          const bookYear = `${bookDate.getMonth()}${bookDate.getFullYear()}`
          if (bookYear !== currentYear) {
            bookList.push({date: bookDate});
            currentYear = bookYear;
          }
          bookList.push(book);
          return bookList;
        }, []);
        return bookReduce;
      })
    );
  }

  transformTime(time) {
    const timeStamp = new Date(time);
    return (
      timeStamp.toLocaleDateString() + ' ' + timeStamp.toLocaleTimeString()
    );
  }

  openDialog(data: BookRating): void {
    const dialogRef = this.dialog.open(BookEditComponent, {
      width: '600px',
      data
    });

    dialogRef.afterClosed().subscribe((result?: {book: BookRating, action: 'save'|'delete'}) => {
      if (result) {
        if (result.action === 'delete') {
          this.deleteBook(result.book);
        } else if (result.action === 'save') {
          this.createOrUpdateBook(result.book);
        }
      }
    });
  }
}
