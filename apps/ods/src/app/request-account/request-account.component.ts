import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable, Subscription } from 'rxjs';
//import { Role } from '../../types.graphql';
import { RequestAccountService } from './request-account.service';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//     // eslint-disable-next-line complexity
//     isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//       const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
//       const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

//       return (invalidCtrl || invalidParent);
//     }
//   }

@Component({
  selector: 'odst-request-account',
  templateUrl: './request-account.component.html',
  styleUrls: ['./request-account.component.scss'],
})
export class RequestAccountComponent implements OnInit {
  orgs: Observable<string[]>;

  roles = ['Commander', 'DEI', 'Admin'];
  request: string[];
  submitSuccess = false;
  constructor(
    private fb: FormBuilder,
    private requestService: RequestAccountService
  ) {}

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    const pass = group.controls['password'].value;
    const confirmPass = group.controls['confirmPassword'].value;

    return pass === confirmPass ? null : { notSame: true };
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  form = this.fb.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      permissions: ['', [Validators.required]],
      org: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: [''],
    },
    { validator: this.checkPasswords }
  );

  submit() {
    this.request = [
      this.form.value(['firstName']).trim(),
      this.form.value(['lastName']).trim(),
      this.form.value(['email']).trim(),
      this.form.get(['permissions'])?.value,
      this.form.get(['org'])?.value,
      this.form.value(['confirmPassword']),
    ];
  }

  async ngOnInit(): Promise<void> {
    this.orgs = await this.requestService.getManyOrgs();
  }
}
