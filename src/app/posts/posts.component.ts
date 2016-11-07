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
  addingPost: boolean = false;

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
      if(this.admin) this.posts = this.postService.getAllPosts();
    });
  }

  createOrUpdatePost({key, post}) {
    this.postService.createOrUpdate(key, post);
  }

  deletePost(post){
    this.postService.remove(post.key);
  }

  ngOnDestroy() {
  }

  nextPage() {
    this.posts = this.postService.nextPage();
  }
};
