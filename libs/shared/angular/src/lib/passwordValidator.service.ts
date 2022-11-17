import {
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

//This is the tells the ghtml when to trigger an error state
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null): boolean {
    return control?.parent?.errors && control.parent.errors['notSame'];
  }
}
export class CustomValidators {
  static checkPasswords(group: UntypedFormGroup) {
    // here we have the 'passwords' group
    const pass = group.controls['password'].value;
    const confirmPass = group.controls['confirmPassword'].value;

    return pass === confirmPass ? null : { notSame: true };
  }

  static matchingNames(group: UntypedFormGroup) {
    // here we have the 'passwords' group
    const name = group.controls['orgName'].value;
    const confirmName = group.controls['confirmName'].value;

    return name === confirmName ? null : { notSame: true };
  }

  static noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
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
    /^(?!.* )(?=.*[0-9])(?=.*[~!@#$%^&])(?=.*?[A-Z])(?=.*?[a-z])[a-zA-Z0-9~!@#$%^&]{8,32}$/,
};
//these are the custom messages for errors states
export const errorMessages: { [key: string]: string } = {
  password: 'Password does not meet requirements and/or does not match.',
};

export const regExpForOrgNames: { [key: string]: RegExp } = {
  orgName: /^[0-9]{1,3}[ ][a-zA-Z/0-9]+$/,
};

export const errorMessagesForOrgNames: { [key: string]: string } = {
  orgName:
    'Organization name does not meet requirements and/or does not match.',
};
