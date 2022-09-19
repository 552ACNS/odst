import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { PasswordResetService } from './password-reset.service';
import { regExps } from '@odst/shared/angular';

@Component({
  selector: 'odst-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent {
  constructor(
    private passwordResetService: PasswordResetService,
    private fb: UntypedFormBuilder
  ) {}

  passwordResetForm = this.fb.group({
    newPassword: [
      '',
      [Validators.required, Validators.pattern(regExps['password'])],
    ],
    confirmPassword: ['', Validators.required],
  });

  hide = true;
  changeSuccess: boolean;
  resetPassword() {
    this.passwordResetService.passwordReset('Test').subscribe(async (data) => {
      const errors = false;

      this.changeSuccess = !errors && !!data;
    });
  }
}
