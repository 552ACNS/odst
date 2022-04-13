import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'odst-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}
  responses;
  CardSpecs;
  ngOnInit() {
    this.dashboardService.GetResponseCount().subscribe((data) => {
      this.responses = data.data.countResponses;
      console.log(data);

      this.CardSpecs = [
        {
          title: 'Unresolved',
          numberStyle:
            'text-7xl sm:text-8xl font-bold tracking-tight leading-none text-blue-500',
          countOf: this.responses.unresolved,
          suffix: 'Unresolved Reports',
          suffixStyle:
            'text-lg font-medium text-blue-600 dark:text-blue-500 text-center',
          cardRouteParams: false,
        },
        {
          title: 'Overdue',
          numberStyle:
            'text-7xl sm:text-8xl font-bold tracking-tight leading-none text-red-500',
          countOf: this.responses.overdue,
          suffix: 'Overdue Reports',
          suffixStyle:
            'text-lg font-medium text-red-600 dark:text-red-500 text-center',
        },
        {
          title: 'Resolved',
          numberStyle:
            'text-7xl sm:text-8xl font-bold tracking-tight leading-none text-green-500',
          countOf: this.responses.resolved,
          suffix: 'Resolved Reports',
          suffixStyle:
            'text-lg font-medium text-green-600 dark:text-green-500 text-center',
          cardRouteParams: true,
        },
      ];
    });
  }
}
