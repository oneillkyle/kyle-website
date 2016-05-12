import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'post-pager',
    templateUrl: 'app/core/pager.component.html',
})
export class PagerComponent implements OnInit, OnDestroy {
    @Input()
    itemsPerPage: number;
    @Input()
    totalItems: number;
    @Input()
    selectedPage: number;
    @Output()
    pageSelected = new EventEmitter();
    
    constructor() {}

    pageChange(page){
        this.pageSelected.emit(page);
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
};
