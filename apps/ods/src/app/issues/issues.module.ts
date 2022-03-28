import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IssuesComponent } from './issues.component';
import { IssuesRoutes } from './issues.routing';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [IssuesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(IssuesRoutes),
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    //temporary
    MatFormFieldModule,
  ],
})
export class IssuesModule {}
