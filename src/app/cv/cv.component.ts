import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cv',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title> Curriculum Vitae </mat-card-title>

        <div class="header-actions">
          <a
            title="CV Published Link"
            href="https://docs.google.com/document/d/e/2PACX-1vRxHkbyLjpSydg5r_U_wHG_kJWzNZoB78e45rlP57rvNDhArv5_oEcKmyVogJCpkpjrH8tNydf8T_Ve/pub"
            target="_blank"
            ><mat-icon>link</mat-icon>
          </a>
        </div>
      </mat-card-header>

      <mat-card-content style="display: flex; justify-content: center;">
        <iframe
          title="Embedded CV"
          height="1400px"
          style="border: none"
          src="https://docs.google.com/document/d/e/2PACX-1vRxHkbyLjpSydg5r_U_wHG_kJWzNZoB78e45rlP57rvNDhArv5_oEcKmyVogJCpkpjrH8tNydf8T_Ve/pub?embedded=true"
        ></iframe>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {
  docId =
    '2PACX-1vRxHkbyLjpSydg5r_U_wHG_kJWzNZoB78e45rlP57rvNDhArv5_oEcKmyVogJCpkpjrH8tNydf8T_Ve';
  embedLink = `https://docs.google.com/document/d/e/${this.docId}/pub?embedded=true`;
  pubLink = `https://docs.google.com/document/d/e/${this.docId}/pub`;
  constructor() {}

  ngOnInit() {}
}
