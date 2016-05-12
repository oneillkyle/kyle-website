import { Component }       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import {PostComponent} from './posts/post.component';
import {PostsComponent} from './posts/posts.component';
import {AboutComponent} from './about/about.component';
import {AdminComponent} from './admin/admin.component';
import {SideNavComponent} from './core/side-nav.component';
import {AdminService} from './admin/admin.service';
import {PostService} from './posts/post.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES, SideNavComponent],
    providers: [
        ROUTER_PROVIDERS,
        AdminService
    ]
})

@RouteConfig([
    {
        path: '/blog',
        name: 'Blog',
        component: PostsComponent,
        useAsDefault: true
    },
    {
        path: '/blog/create',
        name: 'Create a Blog Post',
        component: PostComponent
    },
    {
        path: '/about',
        name: 'About',
        component: AboutComponent
    },
    {
        path: '/admin',
        name: 'Admin',
        component: AdminComponent
    },
])

export class AppComponent {
    title = 'Kyle\'s Website';
}
