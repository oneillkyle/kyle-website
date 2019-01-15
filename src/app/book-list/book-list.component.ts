import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../admin/auth.service';
import { BookRating } from '../datatypes';

import { BookListService } from './book-list.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  form: FormGroup;

  user;
  admin;
  authSub;

  constructor(
    private bookListService: BookListService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.bookListService.setEndpoint('book-list');
    this.getUser();
    this.form = this.newForm();
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

  createOrUpdateBook({ key, book }) {
    this.bookListService.createOrUpdate(key, book);
  }

  deleteBook(book) {
    this.bookListService.remove(book.id);
  }

  nextPage() {
    this.books = this.bookListService.nextPage();
  }

  newForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      date: [null, Validators.required],
      rating: [0, Validators.required],
      audio: [false],
      purchaseLink: ['', Validators.required],
      reviewLink: [],
      image: []
    });
  }

}
