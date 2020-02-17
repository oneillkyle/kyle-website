import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';

import { AuthService } from '../../admin/auth.service';
import { BookRating, User } from '../../datatypes';

import { BookListService } from '../book-list.service';
import { BookEditComponent } from '../book-edit/book-edit.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
  providers: []
})
export class BookViewComponent implements OnInit {
  book: BookRating;
  user: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private bookListService: BookListService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.bookListService.setEndpoint('book-list');
    this.route.params.subscribe(params => {
      if (params.id) {
        this.bookListService
          .getSingleBook(params.id)
          .subscribe(book => (this.book = book));
      }
    });
    this.getUser();
  }

  getUser() {
    this.user = this.authService.getAuth();
  }

  createOrUpdateBook(book: BookRating) {
    this.bookListService.createOrUpdate(book);
  }

  deleteBook(book: BookRating) {
    this.bookListService.remove(book.key);
  }

  openDialog(data: BookRating): void {
    const dialogRef = this.dialog.open(BookEditComponent, {
      width: '600px',
      data
    });

    dialogRef
      .afterClosed()
      .subscribe((result?: { book: BookRating; action: 'save' | 'delete' }) => {
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
