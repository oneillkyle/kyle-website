// feed.component.ts
import {Component, OnInit, OnDestroy} from 'angular2/core';
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

    constructor(
        private postService: PostService
        ) { }

    ngOnInit() {
        this.subscription = this.postService.getAll().subscribe(post => {
            this.posts.push(post);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
};
