import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent {

  @Input() title = 'Management';
  @Input() createAction = true;
  @Input() readAction = true;
  @Output() create = new EventEmitter<any>();
  @Output() read = new EventEmitter<any>();
  dataSource: MatTableDataSource<any>;
  columns: Array<string> = [];
  columnsHeader: Array<string>;
  tableData: any[] = [];
  resultsPerPage = 4;
  currentPageIndex = 0

  @Input()
  set data(data: Observable<any[]>) {
    data.subscribe(dataValue => {
      const columnsSet: Set<string> = new Set(['address', 'id', 'productName', 'planName', 'cups', 'tariff']);
      this.columns = Array.from(columnsSet);
      this.tableData = dataValue;
      this.dataSource = new MatTableDataSource<any>(dataValue.slice(0,this.resultsPerPage));
      columnsSet.add('actions');
      this.columnsHeader = Array.from(columnsSet);
    });
  }

  onCreate(): void {
    this.create.emit();
  }

  onRead(item): void {
    this.read.emit(item);
  }

  getResultsForPage(pageIndex: number): any[] {
    const start = pageIndex * this.resultsPerPage;
    const end = start + this.resultsPerPage;
    return this.tableData.slice(start, end);
  }

  previousPage() {
    if (this.hasPreviousPage()) {
      this.currentPageIndex--;
      this.dataSource.data = this.getResultsForPage(this.currentPageIndex);
    }
  }

  hasPreviousPage(): boolean {
    return this.currentPageIndex !== 0;
  }

  nextPage() {
    if (this.hasNextPage()) {
      this.currentPageIndex++;
      this.dataSource.data = this.getResultsForPage(this.currentPageIndex);
    }
  }

  hasNextPage(): boolean {
    return (this.currentPageIndex + 1) * this.resultsPerPage < this.tableData.length;
  }

}
