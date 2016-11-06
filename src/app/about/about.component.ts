import {Component, OnInit, OnDestroy} from '@angular/core';
import {Post} from '../posts/post';
import {AboutService} from './about.service';
import {AuthService} from '../admin/auth.service';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  providers: [AboutService],
})
export class AboutComponent implements OnInit {
  public about;
  public enableEdit: boolean = false;

  user;
  admin;
  authSub;

  constructor(
    private aboutService: AboutService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getUser();
    this.aboutService.get().subscribe(post => {
      this.about = post;
    });
  }

  getUser() {
    this.authSub = this.authService.getAuth().subscribe(user => {
      this.user = user['user'];
      this.admin = user['admin'];
      this.enableEdit = this.admin;
    });
  }

  updatePost({key, post}) {
    this.aboutService.set(post);
  }

  ngOnDestroy() {

  }
};
