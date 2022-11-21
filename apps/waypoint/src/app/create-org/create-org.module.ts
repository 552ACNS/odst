import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { CreateOrgComponent } from './create-org.component';
import { RouterModule } from '@angular/router';
import { createOrgRoutes } from './create-org.routing';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [CreateOrgComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    RouterModule.forChild(createOrgRoutes),
    MatIconModule,
  ],
  exports: [],
})
export class CreateOrgModule {}
