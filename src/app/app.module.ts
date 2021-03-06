import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
// Imports for loading & configuring the in-memory web api
import { AppComponent } from './app.component';
import { routing } from './routes';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule  } from '@angular/fire/database';
import { firebaseConfig } from './firebase-config';
import { NgxMdModule } from 'ngx-md';

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
import { BookListService } from './book-list/book-list.service';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { BooksComponent } from './books/books.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookEditComponent} from './book-list/book-edit/book-edit.component';
import { StarRatingComponent } from './rating/rating.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        routing,
        SharedModule,
        BrowserAnimationsModule,
        NgxMdModule.forRoot(),
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
        HomeComponent,
        BlogComponent,
        BooksComponent,
        BookListComponent,
        BookEditComponent,
        StarRatingComponent
    ],
    providers: [
        AuthGuard,
        AuthService,
        BookListService
    ],
    entryComponents: [
        BookEditComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
