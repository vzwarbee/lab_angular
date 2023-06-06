import { Component } from '@angular/core';
import { PostService } from 'src/app/service/post/post.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoreService } from 'src/app/service/core/core.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  listComment: any
  submitForm: FormGroup
  constructor(private _postService: PostService, private _fb: FormBuilder, private _coreService: CoreService) {
    this.submitForm = this._fb.group({
      fullName: "",
      email: "",
      commentContent: "",
      rating: "",
    })
  }
  ngOnInit() {
    this.getComment()
  }

  submitComment() {
    if (!this.submitForm.valid) {
      this._postService.creatComment(this.submitForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Thêm bình luận thành công', 'done')
          this.getComment()
          this.submitForm.reset()
        },
        error: (err) => {
          console.error(err)
        }
      })
    } else {
      this._coreService.openSnackBar('Có lỗi gì đó', 'done')
    }
  }

  getComment() {

    this._postService.getComment().subscribe({
      next: (res) => {

        this.listComment = res
      },
      error: (res) => {
        console.error(res);
      }
    });
  }



}
