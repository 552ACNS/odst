import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResponsesComponent } from './responses.component';
import { ResponsesRoutes } from './responses.routing';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [ResponsesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ResponsesRoutes),
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    //temporary
    MatFormFieldModule,
  ],
})
export class ResponsesModule {}
