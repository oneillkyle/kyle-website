// feed.component.ts
import {Component, OnInit, OnDestroy} from 'angular2/core';
import {RouteData} from 'angular2/router';
import {Post} from './post';
import {PostService} from './post.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'posts',
    templateUrl: 'app/posts/posts.component.html',
    providers: [PostService],
})
export class PostsComponent implements OnInit, OnDestroy {
    public posts: Post[] = [];
    public subscription: Subscription<Post>;
    public enableEdit: boolean;

    constructor(
        private postService: PostService,
        data: RouteData) {
            this.enableEdit = data.get('enableEdit') || false;
        }

    ngOnInit() {
        this.nextPage();
    }

    ngOnDestroy() {
    }

    nextPage() {
        this.postService.nextPage().subscribe(posts => {
            this.posts = posts;
        });
    }

    previousPage() {
        this.postService.previousPage().subscribe(posts => {
            this.posts = posts;
        });
    }
};
