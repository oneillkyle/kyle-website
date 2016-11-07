import { Component }       from '@angular/core';

import {AuthService} from './admin/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: []
})

export class AppComponent {
    title = 'Kyle\'s Website';
    user;
    admin;
    sub: any;

    public constructor(
        private authService: AuthService){
    }

    ngOnInit() {
        this.sub = this.authService.getAuth().subscribe(user => {
            this.user = user['user'];
            this.admin = user['admin'];
        });
    }

    ngOnDestroy() {
    }

    signOut(){
        this.authService.logout();
    }
}
