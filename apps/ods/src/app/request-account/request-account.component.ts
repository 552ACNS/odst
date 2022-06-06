import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Role } from '../../types.graphql';
import { RequestAccountService } from './request-account.service';
import {
  CustomValidators,
  MyErrorStateMatcher,
  regExps,
  errorMessages,
} from '@odst/shared/angular';

@Component({
  selector: 'odst-request-account',
  templateUrl: './request-account.component.html',
  styleUrls: ['./request-account.component.scss'],
})
export class RequestAccountComponent implements OnInit {
  // TODO: create custom error for non unique email upon submission.
  // TODO: edit regex so that spaces are not allowed (this may be covered in password-strength library, do not know yet)
  // TODO: fix antiquated group command that is causeing eslint error.
  form = this.fb.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      grade: [''],
      permissions: ['', [Validators.required]],
      org: ['', [Validators.required]],
      password: [
        '',
        [Validators.required, Validators.pattern(regExps['password'])],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: CustomValidators.checkPasswords }
  );
  // form = new FormGroup({
  //   firstName: new FormControl('', [Validators.required]),
  //   lastName: new FormControl('', [Validators.required]),
  //   email: new FormControl('', [Validators.email]),
  //   grade: new FormControl(''),
  //   permissions: new FormControl('', [Validators.required]),
  //   org: new FormControl('', [Validators.required]),
  //   password: new FormControl('', [Validators.required, Validators.pattern(regExps['password'])],),
  //   confirmPassword: new FormControl('', [Validators.required]),
  // })

  hide = true;
  emailNotUnique = false;
  errors = errorMessages;
  matcher = new MyErrorStateMatcher();
  grades = [
    'N/A',
    'O-1',
    'O-2',
    'O-3',
    'O-4',
    'O-5',
    'O-6',
    'O-7',
    'O-8',
    'O-9',
    'O-10',
  ];
  orgs: Observable<string[]>;
  roles = ['Commander', 'DEI', 'Admin'];
  grade?: string;
  submitSuccess = false;
  constructor(
    private fb: FormBuilder,
    private requestService: RequestAccountService
  ) {}
  async ngOnInit(): Promise<void> {
    this.orgs = await this.requestService.getOrgNames();
  }

  async uniqueEmail() {
    //TODO: optimize the way it determines the amount of queries to send to the backend
    if (this.form.value['email'].trim().includes('@') == true) {
      (
        await this.requestService.emailExists(this.form.value['email'].trim())
      ).subscribe((data) => {
        this.emailNotUnique = data;
        console.log(this.emailNotUnique);
        console.log(this.form.value['email'].trim());
      });
    }
  }
  gradeCheck(grade?: string) {
    if (grade == 'N/A') {
      grade = undefined;
    }
    return grade;
  }

  determineRole(roleInput: string): Role {
    if (roleInput == 'Commander') {
      return Role.Cc;
    } else if (roleInput == 'DEI') {
      return Role.Dei;
    } else {
      return Role.Admin;
    }
  }

  //prerequisite: email must be unique
  submit() {
    this.grade = this.gradeCheck(this.form.get(['grade'])?.value);
    this.requestService
      .submitAccountCreationRequest({
        firstName: this.form.value['firstName'].trim(),
        lastName: this.form.value['lastName'].trim(),
        email: this.form.value['email'].trim(),
        grade: this.grade,
        role: this.determineRole(this.form.get(['permissions'])?.value),
        orgs: {
          connect: [
            {
              name: this.form.get(['org'])?.value,
            },
          ],
        },
        password: this.form.value['confirmPassword'].trim(),
      })
      .subscribe(({ errors }) => {
        this.submitSuccess = !errors;
      });
  }
}
