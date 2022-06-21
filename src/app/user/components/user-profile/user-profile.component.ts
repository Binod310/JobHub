import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/services/auth.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentFileUpload: File;
  myFile: FileList;
  avatarUrl: any = '../../../../assets/user-avatar.png';
  isSpinning = false;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];
  objectURL: any;
  validateForm!: FormGroup;
  size: NzButtonSize = 'large';

  constructor(private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private authService: AuthService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
    });
    this.getUserData();
  }



  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  getUserData() {
    this.authService.getUserById().subscribe(res => {
      this.validateForm.patchValue(res.data);
      if (res.data.returnedImg != null) {

        this.objectURL = 'data:image/png;base64,' + res.data.returnedImg;
        this.avatarUrl = this.sanitizer.bypassSecurityTrustUrl(this.objectURL);
      }
    })
  }


  submitForm(): void {

    console.log(this.avatarUrl);
    if (this.avatarUrl != this.objectURL) {
      if (this.validateForm.valid) {
        console.log("In function");
        this.isSpinning = true;

        const formData: FormData = new FormData();
        formData.append('name', this.validateForm.get('name').value);
        formData.append('id', UserStorageService.getUserId());
        console.log(formData);
        this.authService.updateUser(formData).subscribe((res) => {
          this.isSpinning = false;
          if (res.status == "CREATED") {
            this.notification
              .success(
                'SUCCESS',
                `Profile Updated Successfully!!!`,
                { nzDuration: 5000 }
              );
          } else {
            this.notification
              .error(
                'ERROR',
                `${res.message}`,
                { nzDuration: 5000 }
              )
          }
        });
      } else {
        for (const i in this.validateForm.controls) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
        }
      }
    } else {
      this.notification
        .error(
          'ERROR',
          `Please Select An Img`,
          { nzDuration: 5000 }
        )
    }
  }

  uploadProfileImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];
    this.currentFileUpload = file;
    alert('File is here : ' + this.currentFileUpload);

  }

  public uploadFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.myFile = input.files;

    if (!input.files?.length) {
      return;
    }
    this.currentFileUpload = input.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.currentFileUpload);
    reader.onload = (_event) => {
      this.avatarUrl = reader.result;
    };
  }
}
