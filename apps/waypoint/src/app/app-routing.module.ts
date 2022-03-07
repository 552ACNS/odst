import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrgComponent } from './create-org/create-org.component';
import { CreatePersonComponent } from './create-person/create-person.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [

   { path: 'login', 
      loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'navigation-bar', component: NavigationBarComponent },
  { path: 'create-person', component: CreatePersonComponent },
  { path: 'create-org', component: CreateOrgComponent },  
  { path: 'table-view', component: TableComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
