import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
declare var firebase: any;
declare var firebaseui: any;

import { Router}    from '@angular/router';
import {AuthService} from './auth.service';


@Component({
    selector: 'login',
    template: `<div id="firebaseui-auth-container"></div>`,
    providers: []
})
export class LoginComponent implements OnInit {
    uiConfig = {
      'signInSuccessUrl': '/games',
      'signInOptions': [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      'tosUrl': '<your-tos-url>',
    };


    public constructor(private authService: AuthService,
        private router: Router){
    }

    ngOnInit() {
        if(this.authService.getUser()){
            this.router.navigate(['/blog']);
        }
        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', this.uiConfig);
    }
}
