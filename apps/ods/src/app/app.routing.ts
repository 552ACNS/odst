import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [

  {
    path: 'disclaimer',
    loadChildren: () => import('./disclaimer/disclaimer.module').then(m => m.DisclaimerModule)
  },
  {path: '', redirectTo: '/disclaimer', pathMatch: 'full'},
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
