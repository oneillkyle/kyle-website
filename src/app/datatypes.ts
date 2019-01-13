import { SafeHtml } from '@angular/platform-browser';

export class User {
  admin: boolean;
  uid: string;
  constructor(options) {
    this.admin = options.admin || false;
    this.uid = options.uid;
  }
}

export class Post {
  constructor(
    public body?: string | SafeHtml,
    public date?: number,
    public title?: string,
    public image?: string,
    public $key?: string | number,
    public key?: string | number
  ) {}
}

export class BookRating {
  constructor(
    public title: string,
    public author: string,
    public date: number,
    public rating: number,
    public audio: boolean,
    public purchaseLink: string,
    public reviewLink?: string,
    public image?: string,
    public key?: string | number
  ) {}
}
