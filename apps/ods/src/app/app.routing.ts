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
  //TODO [ODST-292]: Change feedback to report eventually
  {
    path: 'feedback',
    loadChildren: () =>
      import('./feedback-questions/feedback-questions.module').then(
        (m) => m.FeedbackQuestionsModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'request-account',
    loadChildren: () =>
      import('./request-account/request-account.module').then(
        (m) => m.RequestAccountModule
      ),
  },
  {
    path: 'requested-accounts',
    loadChildren: () =>
      import('./requested-accounts/requested-accounts.module').then(
        (m) => m.RequestedAccountsModule
      ),
  },
  //TODO [ODST-293]: add functionality to auto redirect to login if refresh token not found
  //Should be done, just check that it functions properly every where
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
    //this skips logging in if already logged in.
    //Should we refresh any tokens? access/refresh/id?
    canActivate: [LoggedInGuard],
  },
  {
    path: 'response-lookup',
    loadChildren: () =>
      import('./response-lookup/response-lookup.module').then(
        (m) => m.ResponseLookupModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
