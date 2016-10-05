import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'side-nav',
    template: `
        <div class="row" *ngFor="let post of posts; let last = last">
          <div class="col s12">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">Contact Info</span>
                <ul>
                  <li *ngFor="let info of infoList">
                    <h3> {{info.title}} </h3>
                    <p>
                      <span> <a>{{info.link}}</a> </span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    `
})
export class SideNavComponent implements OnInit, OnDestroy {

	public infoList = [
		{ title: 'Twitter', link: 'twitter' },
		{ title: 'LinkedIn', link: 'linkedin' },
		{ title: 'Github', link: 'github' }
	];
    constructor() {}

    ngOnInit() {
    }

    ngOnDestroy() {
    }
};
