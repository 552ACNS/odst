import {Component, OnInit} from '@angular/core';
import {DashboardService} from "./dashboard.service";
import {SurveyResponseGql} from "../../graphql-generated";


@Component({
  selector: 'odst-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(private dashboardService: DashboardService) {

  }

  responses: SurveyResponseGql[];
  unresolvedReports: number;
  overdueReports: number;
  resolvedReports: number;

  ngOnInit() {
    this.dashboardService.GetResponseCount().subscribe((data) => {
      console.log(data)
      this.responses = data.data.findManySurveyResponses;
      this.unresolvedReports = this.responses.filter(issue => issue.resolution == null).length;
      this.resolvedReports = this.responses.filter(issue => issue.resolution != null).length;
      this.overdueReports = this.responses.filter(issue => this.dateIsMoreThan30DaysAgo(new Date(issue.openedDate))).length;
    })
  }

  dateIsMoreThan30DaysAgo(responseDate: Date) {
    const _difference = new Date().getTime() - responseDate.getTime();
    const _30DaysInMilliseconds = 2592000000;
    return _30DaysInMilliseconds < _difference;
  }
}

// .subscribe(({data}) => {
//   //TODO move all of this functionality to the back end
//   this.responses = data.findManySurveyResponses;
//   this.unresolvedReports = this.responses.filter(issue => issue.resolution == null).length;
//   this.resolvedReports = this.responses.filter(issue => issue.resolution != null).length;
//   this.overdueReports = this.responses.filter(issue => dateIsMoreThan30DaysAgo(new Date(issue.openedDate))).length;
// });
