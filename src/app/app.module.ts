import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
// Imports for loading & configuring the in-memory web api
import { AppComponent } from './app.component';
import { routing } from './routes';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig, firebaseAuthConfig } from './firebase-config';
import { MarkdownModule } from 'angular2-markdown';

import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './admin/auth-guard.service';
import { AuthService } from './admin/auth.service';
import { LoginComponent } from './admin/login.component';

import { PostComponent } from './posts/post.component';
import { PostsComponent } from './posts/posts.component';
import { AboutComponent } from './about/about.component';
import { SideNavComponent } from './core/side-nav.component';
import { PostService } from './posts/post.service';
import { EditorComponent } from './posts/editor.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        MarkdownModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
    ],
    declarations: [
        AppComponent,
        AdminComponent,
        LoginComponent,
        PostComponent,
        PostsComponent,
        AboutComponent,
        SideNavComponent,
        EditorComponent
    ],
    providers: [
        AuthGuard,
        AuthService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
