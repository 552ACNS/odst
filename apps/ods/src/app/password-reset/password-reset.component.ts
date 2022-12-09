import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { PasswordResetService } from './password-reset.service';
import { regExps } from '@odst/shared/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'odst-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  id: string | null;
  constructor(
    private passwordResetService: PasswordResetService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute
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

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id');

    // const value = await this.passwordResetService.checkToken(
    //   this.id
    // );
    console.log(this.id);
  }
}
