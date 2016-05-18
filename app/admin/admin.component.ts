// feed.component.ts
import {Component, OnInit, OnDestroy} from '@angular/core';
import {AdminService} from './admin.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'admin',
    template: `
        <button (click)="login()">Login</button>
        <button (click)="logout()">Logout</button>
    `,
    providers: []
})
export class AdminComponent implements OnInit, OnDestroy {
    public subscription: Subscription;

    constructor(
        private _adminService: AdminService) {
        }

    ngOnInit() {

    }

    login() {
        this.subscription = this._adminService.login().subscribe(
            auth => {console.log(auth)},
            error => {console.log(error)}
        );
    }

    logout() {
        this._adminService.logout();
    }

    ngOnDestroy() {
    }
};
