import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordResetService {
  constructor(private apollo: Apollo) {}

  passwordReset(password: string) {
    return of({
      password: 'HickeyPl3ase',
    });
  }
}
