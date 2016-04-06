import { Component }       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <nav>
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
])

export class AppComponent {
    title = 'Kyle\'s Website';
}
