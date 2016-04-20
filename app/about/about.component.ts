// feed.component.ts
import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Post} from './post';
import {AboutService} from './about.service';

@Component({
    selector: 'about',
    templateUrl: 'app/about/about.component.html',
    providers: [AboutService],
})
export class AboutComponent implements OnInit, OnDestroy {
    constructor(
        private _aboutService: aboutService
        ) { }
};
