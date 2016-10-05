export class Post {
  constructor(
      public id: number,
      public priority: number,
      public title: string,
      public body: string,
      public date: number
  ) { }
};
