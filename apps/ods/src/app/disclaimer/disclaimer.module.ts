import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisclaimerComponent } from './disclaimer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { DisclaimerRoutes } from './disclaimer.routing';


@NgModule({
  declarations: [
    DisclaimerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DisclaimerRoutes),
    ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule
  ]
})
export class DisclaimerModule { }
