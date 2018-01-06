import { Component, OnInit, OnDestroy } from '@angular/core';
import { AboutService } from './about.service';
import { AuthService } from '../admin/auth.service';
import { User, Post } from '../datatypes';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styles: [
    `
      .profile-image {
        display: block;
        margin: 0 auto;
      }
      .body-text {
        text-align: center;
        margin-top: 20px;
      }
      .links {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
      }
      .link {
        // width: 15em;
        padding: 1em;
        text-align: center;
        color: black;
      }
    `
  ],
  providers: [AboutService],
})
export class AboutComponent implements OnInit {
  public about: Post;
  public user: User;

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
