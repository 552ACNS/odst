import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

//This is the tells the ghtml when to trigger an error state
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return control?.parent?.errors && control.parent.errors['notSame'];
  }
}
export class CustomValidators {
  static checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    const pass = group.controls['password'].value;
    const confirmPass = group.controls['confirmPassword'].value;

    return pass === confirmPass ? null : { notSame: true };
  }
}

// export function checkPasswords(group: FormGroup): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const pass = group.controls['password'].value;
//     const confirmPass = group.controls['confirmPassword'].value;
//     return pass === confirmPass ? null : { notSame: true };
//   };
// }

//this is the password requirements regex
export const regExps: { [key: string]: RegExp } = {
  password:
    /^(?=.*[0-9])(?=.*[~!@#$%^&])(?=.*?[A-Z])(?=.*?[a-z])[a-zA-Z0-9~!@#$%^&]{8,48}$/,
};
//these are the custom messages for errors states
export const errorMessages: { [key: string]: string } = {
  password: 'Password does not meet requirements and/or does not match.',
};
