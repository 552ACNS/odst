import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrgComponent } from '../create-org/create-org.component';
import { CreatePersonComponent } from '../create-person/create-person.component';
//import { LoginComponent } from '../login/login.component';
import { NavigationBarComponent } from './navigation-bar.component';
import { TableComponent } from '../table/table.component';

//TODO: clean up routes when routes needed for nav bar are final
const routes: Routes = [
  //{ path: 'login', component: LoginComponent },
  { path: 'navigation-bar', component: NavigationBarComponent },
  { path: 'create-person', component: CreatePersonComponent },
  { path: 'create-org', component: CreateOrgComponent },  
  { path: 'table-view', component: TableComponent },  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class NavigationBarRoutingModule { }
