import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordRecoveryService {
  constructor(private apollo: Apollo) {}

  passwordRecovery(email: string) {
    return of({
      email: 'HickeyPl3ase@a.com',
    });
  }
}
