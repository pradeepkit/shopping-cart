import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms'
import { getError } from '../componentUtils';

import * as R from 'ramda';

const getFirstError = R.pipe(
  R.prop('errors'),
  R.keys,
  R.head,
);

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.css']
})
export class InputErrorComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() control: FormControl;
  @Input() placeholder: string;
  @Input() formErrors: string[];

  constructor() { }

  ngOnInit(): void {
  }

  get controlErrors() {
    return this.formGroup && this.formGroup.errors || null;
  }

  get formError() {
    if (!this.controlErrors || this.formErrors) { return null; }
    return getError(this.formErrors)(this.controlErrors);
  }

  get controlError() {
    if (this.control && this.control.invalid) {
      const code = getFirstError(this.control) ? getFirstError(this.control) : '';
      let errors = this.control.errors;
      let message;
      if (errors) {
        message = Object.values(errors);
      }
      return { code, message };
    }
    return {};
  }

}
