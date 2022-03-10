import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar.component';

//TODO: clean up routes when routes needed for nav bar are final
const routes: Routes = [
  { path: '', component: NavigationBarComponent, children: [
    { path: 'login', 
      loadChildren: () => import('../login/login.module').then(m => m.LoginModule) },
    //{ path: 'navigation-bar', component: NavigationBarComponent },
    { path: 'create-person', 
      loadChildren: () => import('../create-person/create-person.module').then(m => m.CreatePersonModule) },
    { path: 'create-org', 
      loadChildren: () => import('../create-org/create-org.module').then(m => m.CreateOrgModule) },
    { path: 'table-view', 
      loadChildren: () => import('../table-data/table-data.module').then(m => m.TableDataModule) },
  ] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class NavigationBarRoutingModule { }
