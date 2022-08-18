import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ResponseLookupComponent } from './response-lookup.component';
import { ResponseLookupRoutes } from './response-lookup.routing';
import { MatListModule } from '@angular/material/list';
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
