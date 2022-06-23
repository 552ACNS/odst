import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { ResponseCountQuery } from './dashboard.generated';
@Component({
  selector: 'odst-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}
  responses: ResponseCountQuery['ResponseCount'];
  cardSpecs: {
    title: string;
    numberStyle: string;
    countOf: number;
    suffix: string;
    suffixStyle: string;
    resolved?: string;
  }[];

  ngOnInit() {
    this.dashboardService.GetResponseCount().subscribe(({ data }) => {
      this.responses = data.ResponseCount;

      this.cardSpecs = [
        {
          title: 'Unresolved',
          numberStyle: 'text-7xl sm:text-8xl font-bold text-blue-500',
          countOf: this.responses.unresolved,
          suffix: 'Unresolved Reports',
          suffixStyle:
            'text-lg font-medium text-blue-600 dark:text-blue-500 text-center',
          resolved: 'unresolved',
        },
        {
          title: 'Overdue',
          numberStyle: 'text-7xl sm:text-8xl font-bold text-red-500',
          countOf: this.responses.overdue,
          suffix: 'Overdue Reports',
          suffixStyle:
            'text-lg font-medium text-red-600 dark:text-red-500 text-center',
          resolved: 'overdue',
        },
        {
          title: 'Resolved',
          numberStyle: 'text-7xl sm:text-8xl font-bold text-green-500',
          countOf: this.responses.resolved,
          suffix: 'Resolved Reports',
          suffixStyle:
            'text-lg font-medium text-green-600 dark:text-green-500 text-center',
          resolved: 'resolved',
        },
      ];
    });
  }
}
