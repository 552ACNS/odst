import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { PasswordResetComponent } from './password-reset.component';
import { PasswordResetRoutes } from './password-reset.routing';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
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
