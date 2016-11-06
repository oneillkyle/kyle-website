import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { Router}    from '@angular/router';
import {AuthService} from './auth.service';


@Component({
  selector: 'login',
  template: `
      <button (click)="login()">Login</button>
      <button (click)="logout()">Logout</button>
    `,
  providers: []
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  login() {
    this.authService.login();
  }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth['user']) this.router.navigate(['/blog']);
    });

  }
}
