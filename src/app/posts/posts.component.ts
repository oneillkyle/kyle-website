import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../datatypes';
import { PostService } from './post.service';
import { AuthService } from '../admin/auth.service';
import { PagerComponent } from '../core/pager.component';
import { FirebaseListObservable } from 'angularfire2';
import * as _ from 'lodash';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [PostService],
})
export class PostsComponent implements OnInit, OnDestroy {
  public posts: FirebaseListObservable<any>;
  public enableEdit = false;
  public morePosts = false;

  user;
  admin;
  authSub;
  addingPost = false;

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
      this.user = user;
      if (_.get(this.user, 'admin')) this.posts = this.postService.getAllPosts();
    });
  }

  createOrUpdatePost({ key, post }) {
    this.postService.createOrUpdate(key, post);
  }

  deletePost(post) {
    this.postService.remove(post.key);
  }

  ngOnDestroy() {
  }

  nextPage() {
    this.posts = this.postService.nextPage();
  }
};
