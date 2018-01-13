import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
// Imports for loading & configuring the in-memory web api
import { AppComponent } from './app.component';
import { routing } from './routes';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule  } from 'angularfire2/database';
import { firebaseConfig } from './firebase-config';
import { MarkdownModule } from 'ngx-md';

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
import { HomeComponent } from './home/home.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        routing,
        SharedModule,
        BrowserAnimationsModule,
        MarkdownModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig, 'kyle-website'),
        AngularFireAuthModule,
        AngularFireDatabaseModule
    ],
    declarations: [
        AppComponent,
        AdminComponent,
        LoginComponent,
        PostComponent,
        PostsComponent,
        AboutComponent,
        SideNavComponent,
        HomeComponent
    ],
    providers: [
        AuthGuard,
        AuthService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
