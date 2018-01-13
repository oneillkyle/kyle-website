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

const appRoutes: Routes = [
    {
        path: 'about',
        component: AboutComponent,
    },
    {
        path: ':id',
        component: PostsComponent
    },
    // {
    //     path: 'about',
    //     component: AboutComponent
    // },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard]
    },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        pathMatch: 'full',
        component: PostsComponent,
    },
    { path: '**', redirectTo: '' }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
