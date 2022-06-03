import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RequestedAccountsComponent } from './requested-accounts.component';
import { requestedAccountsRoutes } from './requested-accounts.routing';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

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
  ],
})
export class RequestedAccountsModule {}
