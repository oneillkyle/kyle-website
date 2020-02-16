import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  data: Observable<Data>;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.data = this.route.data;
  }

}
