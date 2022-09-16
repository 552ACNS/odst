import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { PasswordRecoveryComponent } from './password-recovery.component';
import { PasswordRecoveryRoutes } from './password-recovery.routing';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [PasswordRecoveryComponent],
  imports: [
    RouterModule.forChild(PasswordRecoveryRoutes),
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
  ],
  exports: [],
})
export class PasswordRecoveryModule {}
