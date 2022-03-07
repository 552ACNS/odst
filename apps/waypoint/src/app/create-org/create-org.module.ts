import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CreateOrgRoutingModule } from './create-org-routing.module';
import { CreateOrgComponent } from './create-org.component';

@NgModule({
    declarations: [CreateOrgComponent],
    imports: [
        CommonModule, 
        CreateOrgRoutingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatCardModule,
    ],
    exports: []
  })
  export class LoginModule {}