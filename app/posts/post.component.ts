// feed.component.ts
import {Component, OnInit, OnDestroy, ElementRef, Input} from 'angular2/core';
import {Post} from './post';
import {PostService} from './post.service';
// import * as jQuery from 'jquery';

@Component({
    selector: 'post',
    templateUrl: 'app/posts/post.component.html',
    providers: [PostService],
})
export class PostComponent implements OnInit, OnDestroy {
    public newPost: any = {};
    private $el: any;

    @Input()
    post: Post;

    constructor(
        private postService: PostService,
        private myElement: ElementRef
        ) { }

    ngOnInit() {
        this.$el = $(this.myElement.nativeElement).find('.summernote');
        this.$el.summernote({
            height: 300,                 // set editor height
            minHeight: null,             // set minimum height of editor
            maxHeight: null,             // set maximum height of editor
            focus: true
        });
    }

    createPost() {
        let d = new Date();
        this.postService.create(this.newPost.title, this.$el.summernote('code'), d.getTime());
        this.newPost = {};
        this.$el.summernote('empty');
    }
};
