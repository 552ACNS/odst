import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RequestedAccountsComponent } from './requested-accounts.component';
import { requestedAccountsRoutes } from './requested-accounts.routing';

@NgModule({
  declarations: [RequestedAccountsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(requestedAccountsRoutes),
  ],
})
export class RequestedAccountsModule {}
