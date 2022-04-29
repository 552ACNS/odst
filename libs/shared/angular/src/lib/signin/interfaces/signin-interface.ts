import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class LoginServiceInterface {
  constructor(protected apollo: Apollo) {}

  abstract submitLogin(
    username: string,
    password: string,
    rememberMe: boolean
  ): void;
}
