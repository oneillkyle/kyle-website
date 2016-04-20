import { Component }       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import {PostComponent} from './posts/post.component';
import {PostsComponent} from './posts/posts.component';
import {AboutComponent} from './about/about.component';
import {PostService} from './posts/post.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS
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
        path: '/blog/edit',
        name: 'Edit Blog Posts',
        component: PostsComponent,
        data: {enableEdit: true}
    },
    {
        path: '/about',
        name: 'About',
        component: AboutComponent
    },
])

export class AppComponent {
    title = 'Kyle\'s Website';
}
