import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { LoginRoutingModule } from './login.routing';
import { LoginComponent } from './login.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule, 
        LoginRoutingModule, 
        ReactiveFormsModule, 
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
    ],
    exports: []
  })
  export class LoginModule {}