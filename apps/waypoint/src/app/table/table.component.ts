import { Component, Input, OnInit } from '@angular/core';

export interface TableProps {
  columnDef: string;
  header: string;
}


@Component({
  selector: 'odst-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() dataSource : unknown[];
  @Input() tableProps : TableProps[];

  // get the column defs of the tableProps
  displayedColumns: string[];

  constructor() { 
    // left blank
  }

  ngOnInit(): void {
    // left blank
    this.displayedColumns = this.tableProps.map(prop => prop.columnDef);
  }
}
