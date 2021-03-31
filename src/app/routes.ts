import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './admin/auth-guard.service';
import { AuthService } from './admin/auth.service';
import { LoginComponent } from './admin/login.component';

import { PostComponent } from './posts/post.component';
import { PostsComponent } from './posts/posts.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { BlogComponent } from './blog/blog.component';
import { BookViewComponent } from './book-list/book-view/book-view.component';
import { CvComponent } from './cv/cv.component';

const appRoutes: Routes = [
    {
        path: 'about',
        component: AboutComponent,
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cv',
        component: CvComponent
    },
    {
        path: 'books',
        component: BooksComponent
    },
    {
        path: 'books/:id',
        component: BookViewComponent
    },
    { path: 'login', component: LoginComponent },
    {
        path: 'blog',
        component: BlogComponent,
    },
    {
        path: 'blog/:id',
        component: BlogComponent,
        data: {endpoint: 'posts'}
    },
    { path: '**', redirectTo: 'blog' }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
