import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: 'disclaimer', 
  loadChildren: () => import('./disclaimer/disclaimer.module').then(m => m.DisclaimerModule) },
  { path: '', redirectTo: '/disclaimer', pathMatch: 'full' },
  {
    path: 'responses',
    loadChildren: () => import('./responses/responses.module').then((m) => m.ResponsesModule),
  },
  { path: 'form', 
      loadChildren: () => import('./survey-questions/survey-questions.module').then(m => m.SurveryQuestionsModule) },
  //TODO: add functionality to auto redirect to login if refresh token not found
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
