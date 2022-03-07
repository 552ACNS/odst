import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePersonComponent } from './create-person.component';

const routes: Routes = [{ path: '', component: CreatePersonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePersonRoutingModule {}