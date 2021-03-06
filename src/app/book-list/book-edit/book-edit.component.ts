import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BookRating } from '../../datatypes';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
  providers: []
})
export class BookEditComponent implements OnInit {
  book: BookRating;
  formattedDate;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BookEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BookRating
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.form = this.newForm();
    const date = this.data.date ? {
      date: new Date(this.data.date)
    } : {};
    this.form.patchValue({
      ...this.data,
      ...date
    });
  }

  saveBook() {
    const date = this.form.value.date;
    const book: BookRating = {
      ...this.form.value,
      date: date.getTime(),
      inverseDate: -date.getTime(),
      year: date.getFullYear()
    };
    if (this.form.valid) {
      this.dialogRef.close({book, action: 'save'});
    }
  }

  deleteBook() {
    this.dialogRef.close({book: this.book, action: 'delete'});
  }

  newForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      date: [null, Validators.required],
      rating: [0, Validators.required],
      audio: [false],
      purchaseLink: [],
      reviewLink: [],
      image: []
    });
  }
}
