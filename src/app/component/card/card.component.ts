import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/service.service'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private _userService: UserService) { }

  cardUser: any

  ngOnInit() {
    this.getUserCard();
  }

  getUserCard() {
    this._userService.getUser().subscribe({
      next: (res) => {
        this.cardUser = res
      },
      error: (res) => {
        console.error(res);
      }
    });
  }

}
