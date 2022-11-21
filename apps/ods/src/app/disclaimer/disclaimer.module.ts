import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisclaimerComponent } from './disclaimer.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RouterModule } from '@angular/router';
import { DisclaimerRoutes } from './disclaimer.routing';

@NgModule({
  declarations: [DisclaimerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DisclaimerRoutes),
    // TODO: [ODST-127] Make shared module for common routes.
    MatCardModule,
    MatButtonModule,
  ],
})
export class DisclaimerModule {}
