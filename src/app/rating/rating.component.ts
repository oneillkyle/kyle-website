import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Start Rating Component
@Component({
  selector: 'app-star-rating',
  template: `
    <span class="star-rating">
      <ng-container *ngIf="!forDisplay">
        <mat-icon
          *ngFor="let n of range; let $index = index"
          class="to-rate"
          (click)="mark($index)"
          color="primary"
        >
          {{ isMarked($index) }}
        </mat-icon>
      </ng-container>
      <ng-container *ngIf="forDisplay">
        <mat-icon
          *ngFor="let n of range; let $index = index"
          class="to-display"
          color="primary"
        >
          {{ isMarked($index) }}
        </mat-icon>
      </ng-container>
    </span>
  `,
  styles: [
    `
      $gray: #aaa;

      body {
        background: black;
        color: white;
      }
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 16px;
        .section {
          display: flex;
          height: 200px;
          align-items: center;
          justify-content: center;
          .block {
            border: 1px solid $gray;
            border-radius: 3px;
            margin: 16px;
            padding: 40px;
            .margin-vertical-8 {
              margin: 8px 0;
            }
          }
        }
      }

      .star-rating {
        .to-rate {
          cursor: pointer;
          padding: 0 3px;
        }
        .fa-star-o {
          color: orange;
        }
        .fa-star {
          color: orange;
        }
        .fa-star-half-o {
          color: orange;
        }
        .to-display {
          padding: 0 2px;
        }
      }
    `
  ]
})
export class StarRatingComponent implements OnInit {
  @Input() score;
  @Input() maxScore = 5;
  @Input() forDisplay = false;
  @Output() rateChanged = new EventEmitter();

  range = [];
  marked = -1;

  constructor() {}

  ngOnInit() {
    for (let i = 0; i < this.maxScore; i++) {
      this.range.push(i);
    }
  }

  public mark = index => {
    this.marked = this.marked === index ? index - 1 : index;
    this.score = this.marked + 1;
    this.rateChanged.next(this.score);
  };

  public isMarked = index => {
    if (!this.forDisplay) {
      if (index <= this.marked) {
        return 'star';
      } else {
        return 'star_border';
      }
    } else {
      if (this.score >= index + 1) {
        return 'star';
      } else if (this.score > index && this.score < index + 1) {
        return 'star_half';
      } else {
        return 'star_border';
      }
    }
  };
}
