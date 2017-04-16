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
    public body?: string,
    public date?: number,
    public title?: string,
    public $key?: string | number
  ) {}
}
