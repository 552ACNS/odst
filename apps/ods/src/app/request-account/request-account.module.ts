import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RequestAccountComponent } from './request-account.component';
import { RequestAccountRoutes } from './request-account.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RequestAccountComponent],
  imports: [
    RouterModule.forChild(RequestAccountRoutes),
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
  ],
  exports: [],
})
export class RequestAccountModule {}
