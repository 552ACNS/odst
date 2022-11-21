import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { ResponseLookupComponent } from './response-lookup.component';
import { ResponseLookupRoutes } from './response-lookup.routing';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
@NgModule({
  declarations: [ResponseLookupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ResponseLookupRoutes),
    MatPaginatorModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
  ],
})
export class ResponseLookupModule {}
