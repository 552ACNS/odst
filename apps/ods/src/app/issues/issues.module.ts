import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IssuesComponent } from './issues.component';
import { IssuesRoutes } from './issues.routing';
import { IssuesBarComponent } from '../issues-bar/issues-bar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [IssuesComponent, IssuesBarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(IssuesRoutes),
    MatPaginatorModule,
    //temporary
    MatFormFieldModule,
  ],
})
export class IssuesModule {}
