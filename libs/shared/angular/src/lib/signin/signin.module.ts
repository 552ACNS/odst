import {
  ClassProvider,
  ExistingProvider,
  FactoryProvider,
  InjectionToken,
  Injector,
  ModuleWithProviders,
  NgModule,
  Type,
  ValueProvider,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoginServiceInterface } from './interfaces/signin-interface';
import { LOGIN_SERVICE } from './signin.constants';
import { Apollo } from 'apollo-angular';

export interface LoginServiceConfig {
  loginService:
    | LoginServiceInterface
    | Type<LoginServiceInterface>
    | InjectionToken<LoginServiceInterface>;
}

@NgModule({
  exports: [SigninComponent],
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
  ],
})
export class SigninModule {
  static forRoot(
    // loginServiceConfig: LoginServiceConfig | ModuleConfigProvider
    loginService: LoginServiceConfig
    // loginService: LoginServiceInterface
    // callBack: (username: string, password: string, rememberMe: boolean) => void
  ): ModuleWithProviders<SigninModule> {
    return {
      ngModule: SigninModule,
      providers: [
        { provide: LOGIN_SERVICE, useValue: loginService.loginService },
        // {
        //   provide: LOGIN_SERVICE,
        //   useFactory: () => loginService,
        //   deps: [Injector, Apollo],
        // },
      ],
      // providers: [
      //   (loginServiceConfig as ModuleConfigProvider).provide
      //     ? (loginServiceConfig as Provider)
      //     : { provide: LOGIN_SERVICE, useValue: loginServiceConfig },
      //   {
      //     provide: LoginServiceInterface,
      //     useFactory: resolveService,
      //     deps: [LOGIN_SERVICE, Injector],
      //   },
      // ],
    };
  }
}
