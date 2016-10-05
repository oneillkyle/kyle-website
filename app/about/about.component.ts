import {Component, OnInit, OnDestroy} from '@angular/core';
import {Post} from '../posts/post';
import {AboutService} from './about.service';
import {AuthService} from '../admin/auth.service';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    providers: [AboutService],
})
export class AboutComponent implements OnInit {
    public about: Post;
    constructor(
        private _aboutService: AboutService
        ) { }

    ngOnInit(){
        this._aboutService.get().subscribe(post => {
            this.about = post;
        });
    }

    ngOnDestroy(){

    }
};
