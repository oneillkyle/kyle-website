// feed.component.ts
import {Component, OnInit, OnDestroy} from 'angular2/core';
import {RouteData} from 'angular2/router';
import {Post} from './post';
import {PostService} from './post.service';
import {AdminService} from '../admin/admin.service';

@Component({
    selector: 'posts',
    templateUrl: 'app/posts/posts.component.html',
    providers: [PostService],
})
export class PostsComponent implements OnInit, OnDestroy {
    public posts: Post[] = [];
    public enableEdit: boolean = false;

    constructor(
        private _postService: PostService,
        private _adminService: AdminService) {
        }

    ngOnInit() {
        this.nextPage();
        this._adminService.getAuth().subscribe(auth => {
            this.enableEdit = auth.isAdmin;
        });
    }

    ngOnDestroy() {
    }

    nextPage() {
        this._postService.nextPage().subscribe(posts => {
            this.posts = posts;
        });
    }

    previousPage() {
        this._postService.previousPage().subscribe(posts => {
            this.posts = posts;
        });
    }
};
