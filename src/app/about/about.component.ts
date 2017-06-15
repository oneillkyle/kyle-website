import { Component, OnInit, OnDestroy } from '@angular/core';
import { AboutService } from './about.service';
import { AuthService } from '../admin/auth.service';
import { User, Post } from '../datatypes';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  providers: [AboutService],
})
export class AboutComponent implements OnInit {
  public about: Post;
  public user: User;
  // private pic: 'https://firebasestorage.googleapis.com/v0/b/blinding-torch-7293.appspot.com/o/FB_IMG_1445642626258.jpg?alt=media&token=769187fc-1d15-411b-825c-fd6930f1d4cd'

  constructor(
    private aboutService: AboutService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getUser();
    this.aboutService.get().subscribe((post: Post) => {
      this.about = post;
    });
  }

  getUser() {
    this.authService.getAuth().subscribe((user: User) => {
      this.user = user;
    });
  }

  updatePost({ key, post }) {
    this.aboutService.set(post);
  }
};
