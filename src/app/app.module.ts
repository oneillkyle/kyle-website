import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
// Imports for loading & configuring the in-memory web api
import { AppComponent }  from './app.component';
import { routing }       from './routes';

import { CKEditorModule } from 'ng2-ckeditor';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig, firebaseAuthConfig } from './firebase-config';
import { DatePickerModule } from 'ng2-datepicker';

import { AdminComponent } from './admin/admin.component';
import { AuthGuard }    from './admin/auth-guard.service';
import { AuthService }    from './admin/auth.service';
import { LoginComponent } from './admin/login.component';

import {PostComponent} from './posts/post.component';
import {PostsComponent} from './posts/posts.component';
import {AboutComponent} from './about/about.component';
import {SideNavComponent} from './core/side-nav.component';
import {PostService} from './posts/post.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
        CKEditorModule,
        DatePickerModule
    ],
    declarations: [
        AppComponent,
        AdminComponent,
        LoginComponent,
        PostComponent,
        PostsComponent,
        AboutComponent,
        SideNavComponent
    ],
    providers: [
        AuthGuard,
        AuthService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}