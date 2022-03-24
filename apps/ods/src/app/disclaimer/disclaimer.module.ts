import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisclaimerComponent } from './disclaimer.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { DisclaimerRoutes } from './disclaimer.routing';

@NgModule({
  declarations: [DisclaimerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DisclaimerRoutes),
    // TODO: Make shared module for common routes.
    MatCardModule,
    MatButtonModule,
  ],
})
export class DisclaimerModule {}
