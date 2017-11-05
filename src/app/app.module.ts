import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
// Imports for loading & configuring the in-memory web api
import { AppComponent } from './app.component';
import { routing } from './routes';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './firebase-config';
import { MarkdownModule } from 'angular2-markdown';

import { SharedModule } from './shared/shared.module';

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
        HttpModule,
        routing,
        SharedModule,
        BrowserAnimationsModule,
        MarkdownModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig, 'kyle-website'),
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
