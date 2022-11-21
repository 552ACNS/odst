import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { PasswordResetComponent } from './password-reset.component';
import { PasswordResetRoutes } from './password-reset.routing';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
@NgModule({
  declarations: [PasswordResetComponent],
  imports: [
    RouterModule.forChild(PasswordResetRoutes),
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatTooltipModule,
  ],
  exports: [],
})
export class PasswordResetModule {}
