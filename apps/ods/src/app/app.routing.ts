import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, LoggedInGuard } from '@odst/shared/angular';

const routes: Routes = [
  {
    path: 'disclaimer',
    loadChildren: () =>
      import('./disclaimer/disclaimer.module').then((m) => m.DisclaimerModule),
  },
  { path: '', redirectTo: '/disclaimer', pathMatch: 'full' },
  {
    path: 'responses',
    loadChildren: () =>
      import('./responses/responses.module').then((m) => m.ResponsesModule),
    canActivate: [AuthGuard],
  },
  //TODO: Change survey to report eventually
  {
    path: 'survey',
    loadChildren: () =>
      import('./survey-questions/survey-questions.module').then(
        (m) => m.SurveyQuestionsModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
    //this skips logging in if already logged in.
    //Should we refresh any tokens? access/refresh/id?
    canActivate: [LoggedInGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
