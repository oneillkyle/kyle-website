import {Component, OnInit, OnDestroy} from '@angular/core';
import {Post} from './post';
import {PostService} from './post.service';
import {AuthService} from '../admin/auth.service';
import {PagerComponent} from '../core/pager.component';

@Component({
    selector: 'posts',
    templateUrl: './posts.component.html',
    providers: [PostService],
})
export class PostsComponent implements OnInit, OnDestroy {
    public posts: Post[] = [];
    public enableEdit: boolean = false;
    public morePosts: boolean = false;

    user;
    admin;
    authSub;

    constructor(
        private _postService: PostService,
        private authService: AuthService) {
        }

    ngOnInit() {
        this.nextPage();
        this.getUser();
    }

    getUser() {
        this.authSub = this.authService.authSubscribe().subscribe(user => {
            this.user = user['user'];
            this.admin = user['admin'];
            this.enableEdit = this.admin;
        });
        this.authService.emitUser();
    }

    ngOnDestroy() {
    }

    nextPage() {
        this._postService.nextPage().subscribe(posts => {
            this.posts = this.posts.concat(posts);
            this.morePosts = this._postService.morePosts;
        });
    }

    // previousPage() {
    //     this._postService.previousPage().subscribe(posts => {
    //         this.posts = posts;
    //         this.morePosts = this._postService.morePosts;
    //     });
    // }
};
