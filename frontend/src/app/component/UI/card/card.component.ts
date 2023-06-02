import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }

  cardUser: any

  ngOnInit() {
    // this.getUserCard();
  }

  // getUserCard() {
  //   this._userService.getUser().subscribe({
  //     next: (res) => {
  //       this.cardUser = res
  //     },
  //     error: (res) => {
  //       console.error(res);
  //     }
  //   });
  // }

}
