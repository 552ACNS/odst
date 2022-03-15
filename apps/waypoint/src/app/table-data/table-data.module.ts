import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { TableDataComponent } from './table-data.component';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { tableDataRoutes } from './table-data.routing'
@NgModule({
  declarations: [TableDataComponent, TableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    [RouterModule.forChild(tableDataRoutes)]
  ],
  exports: [],
})
export class TableDataModule {}
