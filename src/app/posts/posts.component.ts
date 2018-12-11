import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Post } from '../datatypes';
import { PostService } from './post.service';
import { AuthService } from '../admin/auth.service';
import { PagerComponent } from '../core/pager.component';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [PostService],
})
export class PostsComponent implements OnInit, OnDestroy {
  public posts: Observable<Post[]>;
  public post: Post;
  public enableEdit = false;
  public morePosts = false;
  public creatingPost = false;

  user;
  admin;
  authSub;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.getUser();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      id ? this.getSinglePost(id) : this.getAllPosts();
    });
  }

  getUser() {
    this.authSub = this.authService.getAuth().subscribe(user => {
      this.user = user;
      // if (_.get(this.user, 'admin')) this.posts = this.postService.getAllPosts();
    });
  }

  getSinglePost(id: string) {
    this.posts = null;
    // this.post = this.postService.getSinglePost(id);
    this.postService.getSinglePost(id).pipe(first()).subscribe(post => {
      if (!post) this.router.navigate(['/']);
      this.post = post
    });
  }

  getAllPosts() {
    this.post = null;
    this.nextPage();
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
