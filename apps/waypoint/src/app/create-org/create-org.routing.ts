import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrgComponent } from './create-org.component';

const routes: Routes = [{ path: '', component: CreateOrgComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateOrgRoutingModule {}