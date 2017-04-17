import { Component, OnInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Post } from '../datatypes';
import * as _ from 'lodash';
declare var tinymce: any;

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styles: [
    `.mat-card-subtitle {
      padding-left: 2px;
    }
    
    .post-submits {
      margin-top: 15px;
      margin-left: 5px;
    }
    
    .post-actions {
      margin-left: 10px;
    }`
  ],
  providers: [],
})
export class PostComponent implements OnInit {
  @Input()
  post: Post;
  @Input()
  enableEdit = false;
  @Input()
  enableDelete = false;
  @Input()
  morePosts = false;
  @Input()
  noHeader = false;
  @Output()
  onPostSave: EventEmitter<any> = new EventEmitter();
  @Output()
  onDeletePost: EventEmitter<any> = new EventEmitter();
  @Output()
  onMorePosts: EventEmitter<any> = new EventEmitter();

  dateOptions = {};
  editingPost = false;
  date;
  formattedDate;
  newPost = false;
  currentDate;
  get displayPostBody() {
    return  this.sanitizer.bypassSecurityTrustHtml(this.post.body as string);
  }

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if (!this.post) {
      this.editingPost = true;
      this.newPost = true;
      this.post = new Post();
    }
    this.currentDate = new Date().getTime();
    this.date = _.get(this.post, 'date', this.currentDate);
    this.formattedDate = this.transformTime(this.date);
  }

  editPost() {
    this.editingPost = true;
  }

  createOrUpdatePost() {
    this.post.date = new Date(this.formattedDate).getTime();
    this.onPostSave.emit({
      key: _.get(this.post, '$key', null),
      post: _.omit(this.post, '$key')
    });
    if (this.newPost) {
      this.post = {};
    } else {
      this.editingPost = false;
    }
  }

  deletePost() {
    if (confirm('Are you sure you want to delete?')) {
      this.onDeletePost.emit({
        key: _.get(this.post, '$key', null)
      });
    }
  }

  loadMorePosts() {
    this.onMorePosts.emit();
  }

  transformTime(time) {
    const timeStamp = new Date(time);
    return timeStamp.toLocaleDateString() + ' ' + timeStamp.toLocaleTimeString();
  }
};
