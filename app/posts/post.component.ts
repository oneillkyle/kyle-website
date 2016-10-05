import {Component, OnInit, OnDestroy, ElementRef, Input} from '@angular/core';
import {Post} from './post';
import {PostService} from './post.service';

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
    providers: [PostService],
})
export class PostComponent implements OnInit, OnDestroy {
    @Input()
    post: Post;

    constructor(
        private postService: PostService) {
        // this.post = this.post || {};
    }

    ngOnInit() {
    }

    createOrUpdatePost() {
        let d = new Date();
        this.postService.createOrUpdate(this.post.id, this.post.title, this.post.body, d.getTime()).subscribe(response => {
            console.log(response);
            if( response.status === 201 ){
                this.post.id = response.id;
            }
        });
    }

    ngOnDestroy() {

    }
};
