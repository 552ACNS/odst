import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { SurveyResponseGql } from '../../graphql-generated';
import { NotificationCard } from './notification-card';

@Component({
  selector: 'odst-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  responses: SurveyResponseGql[];
  unresolvedReports: number;
  overdueReports: number;
  resolvedReports: number;
  CardSpecs: NotificationCard[];

  ngOnInit() {
    this.dashboardService.GetResponseCount().subscribe((data) => {
      this.responses = data.data.findManySurveyResponses;

      this.CardSpecs = [
        {
          Title: 'Unresolved',
          NumberStyle:
            'text-7xl sm:text-8xl font-bold tracking-tight leading-none text-blue-500',
          CountOf: this.responses.filter((issue) => issue.resolution == null)
            .length,
          Suffix: 'Unresolved Reports',
          SuffixStyle:
            'text-lg font-medium text-blue-600 dark:text-blue-500 text-center',
        },
        {
          Title: 'Overdue',
          NumberStyle:
            'text-7xl sm:text-8xl font-bold tracking-tight leading-none text-red-500',
          CountOf: this.responses.filter((issue) =>
            this.dateIsMoreThan30DaysAgo(new Date(issue.openedDate))
          ).length,
          Suffix: 'Overdue Reports',
          SuffixStyle:
            'text-lg font-medium text-red-600 dark:text-red-500 text-center',
        },
        {
          Title: 'Resolved',
          NumberStyle:
            'text-7xl sm:text-8xl font-bold tracking-tight leading-none text-green-500',
          CountOf: this.responses.filter((issue) => issue.resolution != null)
            .length,
          Suffix: 'Resolved Reports',
          SuffixStyle:
            'text-lg font-medium text-green-600 dark:text-green-500 text-center',
        },
      ];
    });
  }

  dateIsMoreThan30DaysAgo(responseDate: Date) {
    const _difference = new Date().getTime() - responseDate.getTime();
    const _30DaysInMilliseconds = 2592000000;
    return _30DaysInMilliseconds < _difference;
  }
}
