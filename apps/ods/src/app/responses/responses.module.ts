import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResponsesComponent } from './responses.component';
import { ResponsesRoutes } from './responses.routing';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ResponsesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ResponsesRoutes),
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    //temporary
    MatFormFieldModule,
  ],
})
export class ResponsesModule {}
