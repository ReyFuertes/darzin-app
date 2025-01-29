import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnChanges {
  @Input() public data: any;
  @Input() public columns: string[] = [];
  @Output() public onEditEmitter = new EventEmitter<any>();
  @Output() public onDeleteEmitter = new EventEmitter<any>();
  @Output() public onViewEmitter = new EventEmitter<any>();
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource: MatTableDataSource<any>;
  public totalRecords: number = 0;
  public pageSize: number = 5;
  public pageIndex: number = 0;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data = changes['data']?.currentValue;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onDelete(item: any): void {
    this.onDeleteEmitter.emit(item);
  }

  public onView(item: any): void {
    this.onViewEmitter.emit(item);
  }

  public onEdit(item: any): void {
    this.onEditEmitter.emit(item);
  }

  public pageChangeEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
