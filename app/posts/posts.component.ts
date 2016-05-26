// feed.component.ts
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Post} from './post';
import {PostService} from './post.service';
import {AdminService} from '../admin/admin.service';
import {PagerComponent} from '../core/pager.component';

@Component({
    selector: 'posts',
    templateUrl: 'app/posts/posts.component.html',
    providers: [PostService],
    directives: [PagerComponent]
})
export class PostsComponent implements OnInit, OnDestroy {
    public posts: Post[] = [];
    public enableEdit: boolean = false;
    public morePosts: boolean = false;

    constructor(
        private _postService: PostService,
        private _adminService: AdminService) {
        }

    ngOnInit() {
        this.nextPage();
        this._adminService.getAuth().subscribe(auth => {
            console.log(auth);
            this.enableEdit = auth.isAdmin;
        });
        // this._postService.getCount().subscribe(total => {
        //     this.totalPosts = total;
        // });
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
