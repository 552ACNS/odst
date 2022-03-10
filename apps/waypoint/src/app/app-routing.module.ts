import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

const routes: Routes = [

   { path: 'login', 
      loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'home', component: NavigationBarComponent }, 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
