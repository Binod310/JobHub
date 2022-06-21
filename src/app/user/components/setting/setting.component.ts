import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  validateForm!: FormGroup;
  isSpinning = false;
  size: NzButtonSize = 'large';
  router: any;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private notification: NzNotificationService,) { }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['newPassword'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  submitt(data: any) {
    console.log(data);
    data.id = UserStorageService.getUserId();
    console.log(data.id);
    this.isSpinning = true;
    this.userService.changePasswordByMatchingOldPassword(data).subscribe((res) => {
      console.log(res);
      this.isSpinning = false;
      if (res.status == "OK") {
        this.notification
          .success(
            'SUCCESS',
            `Changes successfully!`,
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
    }, error => {
      console.log("errorr", error);
      if (error.status == 406) {
        this.notification
          .error(
            'ERROR',
            `${error.error}`,
            { nzDuration: 5000 }
          )
      }
      this.isSpinning = false;

    });
  }
}
