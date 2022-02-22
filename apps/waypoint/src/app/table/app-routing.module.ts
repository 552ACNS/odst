import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrgComponent } from '../create-org/create-org.component';
import { CreatePersonComponent } from '../create-person/create-person.component';
import { FooterComponent } from '../layout/footer/footer-component';
import { LoginComponent } from '../login/login.component';
import { MainLayoutComponent } from '../layout/main-layout/main-layout-component';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { TableComponent } from './table.component';

const routes: Routes = [
  //{ path: 'login', component: LoginComponent },
  //{ path: 'navigation-bar', component: NavigationBarComponent },
  //{ path: 'create-person', component: CreatePersonComponent },


  { path: 'create-person', component: MainLayoutComponent,
  children: [
    { path: '', component: CreatePersonComponent },
  ]
}

  //{ path: 'create-org', component: CreateOrgComponent },  
  //{ path: 'table-view', component: TableComponent },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  //imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
