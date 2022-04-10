import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import * as R from 'ramda';
import { ListServiceService } from '../services/list-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmBoxComponent } from 'src/app/shared/confirm-box/confirm-box.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class TableComponent implements OnInit {

  @Input() dataSource: any = new MatTableDataSource();
  @Input() columnsToDisplayHead: any[] = [];
  @Input() columnsToDisplay: string[] = [];
  @Input() columnsToDisplayList: any = []
  @Output() updateEmployee: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedElement: any;

  constructor(public listService: ListServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnChanges() {
    let temp = [...this.dataSource.data]
    this.dataSource = new MatTableDataSource(temp);
    this.dataSource.paginator = this.paginator;
  }
  addEmployee(event: any) {
    let index = R.findIndex(R.propEq('id', event.id))(this.dataSource.data);
    this.dataSource.data[index] = event;
    let temp = [...this.dataSource.data]
    this.updateEmployee.next(event);
    // this.dataSource = new MatTableDataSource(temp);
  }

  deleteEmployee(element: any) {
    this.openDialog(element);
    // this.listService.deleteEmployee(element.id);
  }

  openDialog(element: any) {
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.listService.deleteEmployee(element.id);
      }
    });
  }
}





