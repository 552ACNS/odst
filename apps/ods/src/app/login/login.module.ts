import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { loginRoutes } from './login.routing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SigninModule } from '@odst/shared/angular';
import { LoginService } from './login.service';

function callBack(username: string, password: string, rememberMe: boolean) {
  console.log(`callback ${username} ${password} ${rememberMe}`);
}

@NgModule({
  declarations: [LoginComponent],
  providers: [LoginService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    RouterModule.forChild(loginRoutes),
    SigninModule.forRoot({ loginService: LoginService }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginModule {}
