import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subject } from 'rxjs';
import { ELEMENT_DATA } from 'src/app/shared/models/table';
import * as R from 'ramda';

@Injectable({
  providedIn: 'root'
})
export class ListServiceService {

  listSubject$ = new BehaviorSubject(new MatTableDataSource(ELEMENT_DATA));

  get getEmployeeList() {
    let list: any;
    this.listSubject$.subscribe((obj: any) => {
      list = obj;
    });
    return list;
  }

  addEmployee(employee: any) {
    let emp = [employee, ...this.getEmployeeList.data]
    this.listSubject$.next(new MatTableDataSource(emp));
  }

  deleteEmployee(id: any) {
    let data = this.getEmployeeList.data.filter((item: any) => item.id !== id);
    this.listSubject$.next(new MatTableDataSource([...data]));
  }
  editEmployee(employee: any) {
    let index = R.findIndex(R.propEq('id', employee.id))(this.getEmployeeList.data);
    this.getEmployeeList.data[index] = employee;
    let temp = new MatTableDataSource([...this.getEmployeeList.data]);
    this.listSubject$.next(temp);
  }

  constructor() { }

}
