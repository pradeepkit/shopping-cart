import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as R from 'ramda';
import { ListServiceService } from './services/list-service.service';
import { ELEMENT_DATA } from '../../shared/models/table'
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  isAddRow: boolean = false;
  dataSource: any;// = new MatTableDataSource();
  hrManager: string = 'Joseph';
  columnsToDisplay = ['Name', 'Contact Number', 'Email Address', 'Designation'];
  columnsToDisplayHead: any[] = [];
  columnsToDisplayList = [
    {
      key: 'name',
      lookup: 'Name'
    },
    {
      key: 'contact_number',
      lookup: 'Contact Number'
    }, {
      key: 'email',
      lookup: 'Email Address'
    },
    {
      key: 'designation',
      lookup: 'Designation'
    },

    {
      key: 'action',
      lookup: 'Action'
    }
  ];

  constructor(public listService: ListServiceService) { }

  ngOnInit(): void {

    this.columnsToDisplayHead = this.columnsToDisplayList.map(obj => {
      return obj.lookup;
    });
    this.listService.listSubject$.subscribe((obj: any) => {
      this.dataSource = obj;
    })
  }
  // ngOnChanges() {
  //   this.dataSource = this.dataSource;
  // }
  AddNewRow() {
    this.isAddRow = true;
  }

  addEmployee(event: any) {

  }

}
