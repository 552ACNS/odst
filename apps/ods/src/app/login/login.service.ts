import { Injectable } from '@angular/core';
import { LoginServiceInterface } from '@odst/shared/angular';
import { Apollo } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class LoginService extends LoginServiceInterface {
  constructor(protected override apollo: Apollo) {
    super(apollo);
    console.log('constructor ods/login.service.ts');
    console.log(typeof apollo);
  }
  submitLogin(username: string, password: string, rememberMe: boolean) {
    console.log('submitLogin ods/login.service.ts');
    console.log(`${username} ${password} ${rememberMe}`);
    // return this.apollo.mutate<LoginMutation, LoginMutationVariables>({
    //   mutation: LoginDocument,
    //   variables: {
    //     loginUserInput: {
    //       username: username,
    //       password: password, //TODO [ODST-136] hash password first, need to change backend too
    //       //TODO rememberMe: rememberMe,
    //     },
    //   },
    // });
  }

  testMethod() {
    console.log('testMethod ods/login.service.ts');
  }
}
