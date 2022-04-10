import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { ListServiceService } from '../services/list-service.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  @Input() employee: any;
  @Input() isAddRow: any;
  @Input() isEditRow: any;
  @Output() addEmployee: EventEmitter<any> = new EventEmitter();
  minlength = 3;
  maxlength = 20;

  empForm: FormGroup;
  designationArray: any[] = ['Junior Software Engineer', 'Software Engineer', 'Senior Software Engineer']

  constructor(private fb: FormBuilder, public listService: ListServiceService) {
    this.setAndresetForm();
  }

  ngOnInit(): void {
    if (this.employee) {
      let tempValue = JSON.parse(JSON.stringify(this.employee));
      this.empForm.patchValue(tempValue);
    }

    this.empForm.get('same_add_check')?.valueChanges.subscribe((obj: any) => {
      if (obj) {
        this.empForm.get('permanent_address')?.patchValue(this.empForm.get('temporary_address')?.value)
      }
    });

  }

  submitForm() {
    console.log('this.empForm', this.empForm);
    if (this.empForm.valid) {
      if (this.isAddRow) {
        this.listService.addEmployee(this.empForm.value);
        this.setAndresetForm();
      } else if (this.isEditRow) {
        this.listService.editEmployee(this.empForm.value);
      }
    }

  }

  setAndresetForm() {
    const id: any = uuid();
    this.empForm = this.fb.group({
      id: [id, Validators.required],
      first_name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3), Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
      last_name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3), Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
      contact_number: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[6-9]\\d{9}')]),
      altl_contact_number: new FormControl('', [Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[6-9]\\d{9}")]),
      same_add_check: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      temporary_address: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.pattern("[ A-Za-z0-9,-<>/&$%@]+")]),
      permanent_address: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.pattern("[ A-Za-z0-9,-<>/&$%@]+")]),
      designation: new FormControl('', [Validators.required]),
    });
  }

}
