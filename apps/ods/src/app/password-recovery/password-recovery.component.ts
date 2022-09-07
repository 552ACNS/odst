import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { PasswordRecoveryService } from './password-recovery.service';

@Component({
  selector: 'odst-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
})
export class PasswordRecoveryComponent {
  constructor(
    private fb: UntypedFormBuilder,
    private passwordRecoveryService: PasswordRecoveryService
  ) {}

  passwordRecoveryForm = this.fb.group({
    email: ['', Validators.required],
  });

  changeSuccess: boolean;
  recoverPassword() {
    this.passwordRecoveryService
      .passwordRecovery('Test')
      .subscribe(async (data) => {
        const errors = false;

        this.changeSuccess = !errors && !!data;
      });
  }
}
