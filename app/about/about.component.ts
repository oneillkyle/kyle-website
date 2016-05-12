// feed.component.ts
import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Post} from '../posts/post';
import {AboutService} from './about.service';
import {AdminService} from '../admin/admin.service';

@Component({
    selector: 'about',
    templateUrl: 'app/about/about.component.html',
    providers: [AboutService],
})
export class AboutComponent implements OnInit, OnDestroy {
    public about: Post;
    constructor(
        private _aboutService: AboutService
        ) { }

    ngOnInit(){
        this._aboutService.get().subscribe(post => {
            this.about = post;
        });
    }
};
