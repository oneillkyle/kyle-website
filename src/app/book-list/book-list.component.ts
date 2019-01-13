import { Component, OnInit } from '@angular/core';

import { BookListService } from './book-list.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [BookListService]
})
export class BookListComponent implements OnInit {

  constructor(
    private bookListService: BookListService
  ) { }

  ngOnInit() {
    this.bookListService.setEndpoint('book-list');
  }

}
