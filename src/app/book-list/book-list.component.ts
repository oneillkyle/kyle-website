import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';

import { AuthService } from '../admin/auth.service';
import { BookRating } from '../datatypes';

import { BookListService } from './book-list.service';
import { BookEditComponent } from './book-edit/book-edit.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: []
})
export class BookListComponent implements OnInit {
  public books: Observable<BookRating[]>;
  public book: BookRating;
  public enableEdit = false;
  public morePosts = false;
  public creatingPost = false;

  user;
  admin;
  authSub;

  constructor(
    private bookListService: BookListService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.bookListService.setEndpoint('book-list');
    this.getUser();
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
    this.books = this.bookListService.nextPage();
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
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        result.action === 'delete' ? this.deleteBook(result.book) : this.createOrUpdateBook(result.book);
      }
    });
  }
}
