import {Component, OnInit, OnDestroy, EventEmitter, Input, Output} from '@angular/core';
import {Post} from './post';
import * as _ from 'lodash';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  providers: [],
})
export class PostComponent implements OnInit, OnDestroy {
  @Input()
  post;
  @Input()
  enableEdit: boolean = false;
  @Input()
  enableDelete: boolean = false;
  @Input()
  morePosts: boolean = false;
  @Output()
  onPostSave: EventEmitter<any> = new EventEmitter();
  @Output()
  onDeletePost: EventEmitter<any> = new EventEmitter();
  @Output()
  onMorePosts: EventEmitter<any> = new EventEmitter();

  dateOptions = {};
  editingPost: boolean = false;
  date;
  formattedDate;
  newPost: boolean = false;
  currentDate;

  constructor() {
  }

  ngOnInit() {
    if(!this.post) {
      this.editingPost = true;
      this.newPost = true;
      this.post = {};
    };
    this.currentDate = new Date().getTime();
    this.date = _.get(this.post, 'date', this.currentDate);
    this.formattedDate = this.transformTime(this.date);
  }

  ngOnDestroy() {
  }

  editPost() {
    this.editingPost = true;
  }

  createOrUpdatePost() {
    this.post.date = new Date(this.formattedDate).getTime()
    this.onPostSave.emit({
      key: _.get(this.post, '$key', null),
      post: _.omit(this.post, '$key')
    });
    if(this.newPost) {
      this.post = {};
    } else {
      this.editingPost = false;
    }
  }

  deletePost() {
    if(confirm('Are you sure you want to delete?')){
      this.onDeletePost.emit({
        key: _.get(this.post, '$key', null)
      });
    }
  }

  loadMorePosts() {
    this.onMorePosts.emit();
  }

  transformTime(time) {
    let timeStamp = new Date(time);
    return timeStamp.toLocaleDateString() + ' ' + timeStamp.toLocaleTimeString();
  }
};
