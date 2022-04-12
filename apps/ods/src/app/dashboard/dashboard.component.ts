import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { NotificationCard } from './notification-card';

@Component({
  selector: 'odst-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  responses;
  CardSpecs: NotificationCard[];

  ngOnInit() {
    this.dashboardService.GetResponseCount().subscribe((data) => {
      this.responses = data.data.countIssues;
      console.log(data);

      this.CardSpecs = [
        {
          Title: 'Unresolved',
          NumberStyle:
            'text-7xl sm:text-8xl font-bold tracking-tight leading-none text-blue-500',
          CountOf: this.responses.unresolved,
          Suffix: 'Unresolved Reports',
          SuffixStyle:
            'text-lg font-medium text-blue-600 dark:text-blue-500 text-center',
          CardRouteParams: false,
        },
        {
          Title: 'Overdue',
          NumberStyle:
            'text-7xl sm:text-8xl font-bold tracking-tight leading-none text-red-500',
          CountOf: this.responses.overdue,
          Suffix: 'Overdue Reports',
          SuffixStyle:
            'text-lg font-medium text-red-600 dark:text-red-500 text-center',
        },
        {
          Title: 'Resolved',
          NumberStyle:
            'text-7xl sm:text-8xl font-bold tracking-tight leading-none text-green-500',
          CountOf: this.responses.resolved,
          Suffix: 'Resolved Reports',
          SuffixStyle:
            'text-lg font-medium text-green-600 dark:text-green-500 text-center',
          CardRouteParams: true,
        },
      ];
    });
  }
}
