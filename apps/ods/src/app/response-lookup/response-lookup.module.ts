import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ResponseLookupComponent } from './response-lookup.component';
import { ResponseLookupRoutes } from './response-lookup.routing';
@NgModule({
  declarations: [ResponseLookupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ResponseLookupRoutes),
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    //temporary
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
  ],
})
export class ResponseLookupModule {}
