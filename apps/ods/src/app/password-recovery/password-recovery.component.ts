import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { PasswordRecoveryService } from './password-recovery.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'odst-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
})
export class PasswordRecoveryComponent {
  constructor(
    private fb: UntypedFormBuilder,
    private passwordRecoveryService: PasswordRecoveryService,
    private sb: MatSnackBar
  ) {}

  passwordRecoveryForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  recoveryRequestError = false;
  recoverPassword() {
    this.passwordRecoveryService
      .passwordRecovery(this.passwordRecoveryForm.value['email'])
      .subscribe(async (data) => {
        const errors = null;

        this.recoveryRequestError = !!errors && !data;
        if (!this.recoveryRequestError) {
          this.sb.open(
            'Password reset request successfully submitted. Please check your email for instructions to reset your password.',
            'okay',
            { duration: 4000 }
          );
        }
      });
  }
}
