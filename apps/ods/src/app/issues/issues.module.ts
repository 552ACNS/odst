import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IssuesComponent } from './issues.component';
import { IssuesRoutes } from './issues.routing';
import { IssuesBarComponent } from '../issues-bar/issues-bar.component';

@NgModule({
  declarations: [IssuesComponent, IssuesBarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(IssuesRoutes)
  ],
})
export class IssuesModule {}
