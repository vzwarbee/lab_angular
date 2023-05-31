import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject, OnInit } from '@angular/core'
import { CoreService } from '../../UI/core/core.service';
import { UserService } from 'src/app/service/service.service';


@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {

  empForm: FormGroup;

  rating: string[] = [
    '1',
    '1.5',
    '2',
    '2.5',
    '3',
    '3.5',
    '4',
    '4.5',
    '5'
  ]

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      imageUrl: "",
      productName: "",
      productCode: "",
      releaseDate: "",
      description: "",
      price: "",
      starRating: ""
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._userService.updateProduct(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Updata product is success', 'done')
            this._dialogRef.close(true)
            this._userService.getProduct()
          },
          error: (err) => {
            console.error(err)
          }
        })
      } else {

        this._userService.addProduct(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('add product success', 'done')
            this._dialogRef.close(true)
            this._userService.getProduct()
          },
          error: (err) => {
            console.error(err)
          }
        })
      }

    }
  }
}
