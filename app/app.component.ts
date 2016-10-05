import { Component }       from '@angular/core';

import {AuthService} from './admin/auth.service';
import './styles.css';
import '../firebase_init.js';

@Component({
    selector: 'my-app',
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
        this.sub = this.authService.authSubscribe().subscribe(user => {
            this.user = user['user'];
            this.admin = user['admin'];
        });
        this.authService.emitUser();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    signOut(){
        this.authService.signOut();
    }
}
