import { Component, OnInit } from '@angular/core';
import { UserService } from './service/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'lab2';
  cardUser: any

  constructor(private _userService: UserService) { }

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
