import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RequestedAccountsComponent } from './requested-accounts.component';
import { requestedAccountsRoutes } from './requested-accounts.routing';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';

@NgModule({
  declarations: [RequestedAccountsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(requestedAccountsRoutes),
    MatTableModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
  ],
})
export class RequestedAccountsModule {}
