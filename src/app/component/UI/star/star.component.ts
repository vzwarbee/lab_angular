import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnInit {
  @Input() rating: number;
  starWidth: number;
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();
  constructor() {
    this.rating = 0;
    this.starWidth = (this.rating * 90) / 5;
  }
  ngOnChanges(): void {
    this.starWidth = (this.rating * 90) / 5;
  }
  onClick(): void {
    this.ratingClicked.emit(`Đánh giá của sản phẩm là ${this.rating} sao!`);
  }

  ngOnInit() { }
}