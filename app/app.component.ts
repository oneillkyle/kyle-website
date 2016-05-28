import { Component }       from '@angular/core';
import {MD_BUTTON_DIRECTIVES} from "@angular2-material/button";
import {MD_CARD_DIRECTIVES} from "@angular2-material/card";
import {MD_CHECKBOX_DIRECTIVES} from "@angular2-material/checkbox";
import {MD_GRID_LIST_DIRECTIVES} from "@angular2-material/grid-list";
import {MdIcon, MdIconRegistry} from "@angular2-material/icon";
import {MD_INPUT_DIRECTIVES} from "@angular2-material/input";
import {MD_LIST_DIRECTIVES} from "@angular2-material/list";
import {MD_PROGRESS_BAR_DIRECTIVES} from "@angular2-material/progress-bar";
import {MD_PROGRESS_CIRCLE_DIRECTIVES} from "@angular2-material/progress-circle";
import {MD_RADIO_DIRECTIVES} from "@angular2-material/radio";
import {MD_SIDENAV_DIRECTIVES} from "@angular2-material/sidenav";
import {MD_SLIDE_TOGGLE_DIRECTIVES} from "@angular2-material/slide-toggle";
import {MD_TABS_DIRECTIVES} from "@angular2-material/tabs";
import {MD_TOOLBAR_DIRECTIVES} from "@angular2-material/toolbar";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
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
    directives: [
        ROUTER_DIRECTIVES, 
        SideNavComponent, 
        MD_CARD_DIRECTIVES, 
        // MD_BUTTON_DIRECTIVES,
        MD_SIDENAV_DIRECTIVES,
        MD_INPUT_DIRECTIVES,
        MD_LIST_DIRECTIVES,
        MD_GRID_LIST_DIRECTIVES,
        // MD_CHECKBOX_DIRECTIVES,
        // MD_RADIO_DIRECTIVES,
        MD_SLIDE_TOGGLE_DIRECTIVES,
        MD_TABS_DIRECTIVES,
        MdIcon
    ],
    providers: [
        ROUTER_PROVIDERS,
        AdminService,
        MdIconRegistry
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
        path: '/blog/:id',
        name: 'Edit a Blog Post',
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
