import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard }    from './admin/auth-guard.service';
import { AuthService }    from './admin/auth.service';
import { LoginComponent } from './admin/login.component';

import {PostComponent} from './posts/post.component';
import {PostsComponent} from './posts/posts.component';
import {AboutComponent} from './about/about.component';
import {AdminComponent} from './admin/admin.component';

const appRoutes: Routes = [
    // {
    //     path: '',
    //     redirectTo: 'blog',
    //     pathMatch: 'full'
    // },
    {
        path: 'blog',
        component: PostsComponent,
    },
    // {
    //     path: 'blog/:id',
    //     component: PostComponent
    // },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: "admin",
        component: AdminComponent,
        canActivate: [AuthGuard]
    },
    { path: "login", component: LoginComponent },
    { path: '**', redirectTo: 'blog' }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
