import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'side-nav',
    template: `
        <div>Test</div>
    `,
})
export class SideNavComponent implements OnInit, OnDestroy {

    constructor() {}

    ngOnInit() {
    }

    ngOnDestroy() {
    }
};
