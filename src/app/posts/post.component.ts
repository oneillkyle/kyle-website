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
  post: Post;
  @Input()
  enableEdit: boolean = false;
  @Input()
  morePosts: boolean = false;
  @Output()
  onPostSave: EventEmitter<any> = new EventEmitter();
  @Output()
  onMorePosts: EventEmitter<any> = new EventEmitter();

  editingPost: boolean = false;
  date;

  constructor() {
  }

  ngOnInit() {
    this.date = moment(this.post.date);
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
  }

  loadMorePosts() {
    this.onMorePosts.emit();
  }
};
