import { Component } from '@angular/core';

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.css']
})
export class CardPostComponent {


  date: Date;
  day: number;
  month: number;

  constructor() {
    this.date = new Date();
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
  }


}
