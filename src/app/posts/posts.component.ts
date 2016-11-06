import {Component, OnInit, OnDestroy} from '@angular/core';
import {Post} from './post';
import {PostService} from './post.service';
import {AuthService} from '../admin/auth.service';
import {PagerComponent} from '../core/pager.component';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  providers: [PostService],
})
export class PostsComponent implements OnInit, OnDestroy {
  public posts: FirebaseListObservable<any>;
  public enableEdit: boolean = false;
  public morePosts: boolean = false;

  user;
  admin;
  authSub;

  constructor(
    private postService: PostService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.nextPage();
    this.getUser();
  }

  getUser() {
    this.authSub = this.authService.getAuth().subscribe(user => {
      this.user = user['user'];
      this.admin = user['admin'];
      this.enableEdit = this.admin;
    });
  }

  createOrUpdatePost({key, post}) {
    this.postService.createOrUpdate(key, post);
  }

  ngOnDestroy() {
  }

  nextPage() {
    this.posts = this.postService.nextPage();
  }
};
