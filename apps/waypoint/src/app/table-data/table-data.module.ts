import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { TableDataComponent } from './table-data.component';
import { MatTableModule } from '@angular/material/table';
import { TableDataRoutingModule } from './table-data.routing';

@NgModule({
  declarations: [TableDataComponent, TableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    TableDataRoutingModule,
  ],
  exports: [],
})
export class TableDataModule {}
