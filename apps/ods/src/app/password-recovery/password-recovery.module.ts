import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { PasswordRecoveryComponent } from './password-recovery.component';
import { PasswordRecoveryRoutes } from './password-recovery.routing';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
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
