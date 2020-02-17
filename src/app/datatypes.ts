import { SafeHtml } from '@angular/platform-browser';

export class User {
  admin?: boolean;
  uid?: string;
  constructor(options) {
    this.admin = options.admin || false;
    this.uid = options.uid || null;
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
    public year: number,
    public rating: number,
    public audio: boolean,
    public purchaseLink?: string,
    public review?: string,
    public image?: string,
    public inverseDate?: number,
    public key?: string
  ) {}
}
