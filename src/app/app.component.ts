import { Component, OnInit } from '@angular/core';

import { AuthService } from './admin/auth.service';
import { User } from './datatypes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Kyle\'s Website';
  user: User;

  public constructor(
    private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getAuth().subscribe((user: User) => {
      this.user = user;
    });
  }

  signOut() {
    this.authService.logout();
  }
}
