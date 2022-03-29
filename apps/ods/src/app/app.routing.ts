import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: 'disclaimer',
    loadChildren: () =>
      import('./disclaimer/disclaimer.module').then((m) => m.DisclaimerModule),
  },
  {path: '', redirectTo: '/disclaimer', pathMatch: 'full'},
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {path: 'dashboard', component: DashboardComponent},
  {
    path: 'responses',
    loadChildren: () =>
      import('./responses/responses.module').then((m) => m.ResponsesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
