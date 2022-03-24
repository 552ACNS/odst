import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'odst-issues-bar',
  templateUrl: './issues-bar.component.html',
  styleUrls: ['./issues-bar.component.scss'],
})
export class IssuesBarComponent {
  length = 100;
  pageSize = 1;

  // MatPaginator Output
  pageEvent: PageEvent;
}
