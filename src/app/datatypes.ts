export class User {
  admin: boolean;
  uid: string;
  constructor(options) {
    this.admin = options.admin || false;
    this.uid = options.uid;
  }
}
