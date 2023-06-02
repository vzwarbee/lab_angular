import { Component } from '@angular/core';
// import { UserService } from 'src/app/service/service.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

  url: string
  id: string
  idNumber: number
  detailUser: any

  constructor() {
    this.url = window.location.href;
    this.id = this.url.substring(this.url.lastIndexOf('/') + 1);

    this.idNumber = parseInt(this.id, 10);
  }

  ngOnInit(): void {
    // this.getUserDetail()
  }




  // getUserDetail() {
  //   this._userService.getUserDetail(this.idNumber).subscribe({
  //     next: (res) => {
  //       this.detailUser = res

  //     },
  //     error: (err) => {
  //       console.error(err)
  //     }
  //   })

  // }
}
