import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'admin',
    template: `
        <div class="row">
            <div class="col s12">
              <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                  <span class="card-title">Admin Panel</span>
                </div>
                <div class="card-action">
                    <a class="waves-effect waves-light btn"
                        *ngIf="admin">Add a Team</a>
                </div>
              </div>
            </div>
        </div>
    `,
    providers: []
})
export class AdminComponent implements OnInit, OnDestroy {
    sub: any;
    user;
    admin;

    public constructor(
        private authService: AuthService,
        private router: Router) {
    }

    ngOnInit() {
        this.sub = this.authService.getAuth().subscribe(user => {
            this.user = user['user'];
            this.admin = user['admin'];
            if (!this.user) {
                this.router.navigate(['/login']);
            }
        });
    }

    ngOnDestroy() {
    }
};
