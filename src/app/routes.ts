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
        path: 'books',
        component: BooksComponent
    },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        pathMatch: 'full',
        component: BlogComponent,
    },
    {
        path: ':id',
        component: BlogComponent
    },
    { path: '**', redirectTo: '' }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
