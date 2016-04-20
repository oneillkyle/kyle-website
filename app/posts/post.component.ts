// feed.component.ts
import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Post} from './post';
import {PostService} from './post.service';

@Component({
    selector: 'post',
    templateUrl: 'app/posts/post.component.html',
    providers: [],
})
export class PostComponent implements OnInit, OnDestroy {
    public newPost: any = {};

    constructor(
        private postService: PostService
        ) { }

    createPost() {
        let d = new Date();
        this.postService.create(this.newPost.title, this.newPost.body, d.getTime());
        this.newPost = {};
    }
};
