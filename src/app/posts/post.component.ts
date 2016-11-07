import {Component, OnInit, OnDestroy, EventEmitter, Input, Output} from '@angular/core';
import {Post} from './post';
import * as moment from 'moment';
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
  morePosts: boolean = false;
  @Output()
  onPostSave: EventEmitter<any> = new EventEmitter();
  @Output()
  onDeletePost: EventEmitter<any> = new EventEmitter();
  @Output()
  onMorePosts: EventEmitter<any> = new EventEmitter();

  editingPost: boolean = false;
  date;
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
    this.date = moment(_.get(this.post, 'date', this.currentDate));
  }

  ngOnDestroy() {
  }

  editPost() {
    this.editingPost = true;
  }

  createOrUpdatePost() {
    this.post.date = this.date.valueOf();
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
    this.onDeletePost.emit({
      key: _.get(this.post, '$key', null)
    });
  }

  loadMorePosts() {
    this.onMorePosts.emit();
  }
};
