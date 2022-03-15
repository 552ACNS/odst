import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CreateOrgComponent } from './create-org.component';
import { RouterModule } from '@angular/router';
import { createOrgRoutes } from './create-org.routing'
@NgModule({
    declarations: [CreateOrgComponent],
    imports: [
        CommonModule, 
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatCardModule,
        RouterModule.forChild(createOrgRoutes)
    ],
    exports: []
  })
  export class CreateOrgModule {}