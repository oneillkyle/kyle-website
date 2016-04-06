import { Component }       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import {PostComponent} from './posts/post.component';
import {PostsComponent} from './posts/posts.component';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a [routerLink]="['Blog']">Blog</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    // styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
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
])

export class AppComponent {
    title = 'Kyle\'s Website';
}
