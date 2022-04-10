import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { DEFAULT_CONTROL_NAME, DEFAULT_FORM_GROUP, InputErrorStateMatcher } from '../componentUtils';
import * as R from 'ramda';
import { debounceTime } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';

const isValueEmpty = R.pipe(R.anyPass([R.isEmpty, R.isNil]));

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  matcher: ErrorStateMatcher;
  input: any;
  @Input() name = DEFAULT_CONTROL_NAME;
  @Input() placeholder: any;
  @Input() type: 'text' | 'number' | 'email' = 'text';
  @Input() required: any;
  @Input() formGroup: FormGroup = DEFAULT_FORM_GROUP;
  @Input() value: any = null;
  @Input() formErrors: string[] = [];
  @Input() maxlength = 20;
  @Input() minlength = 3;
  @Input() min: any;
  @Input() max: any;
  @Input() hint: string = '';

  @Output() blur = new EventEmitter<MouseEvent>();
  @ViewChild('input') formInput: MatInput;
  @Input() errorPlaceholder = null;




  constructor(private cdRef: ChangeDetectorRef) {
  }

  get control(): AbstractControl {
    return this.formGroup.get(this.name) as AbstractControl;
  }



  ngOnInit(): void {
    if (this.isEmptyCheckRequired) {
      this.applyEmptyCheckValidation();
    }
    this.matcher = new InputErrorStateMatcher(this.formErrors);
    this.subscribeValueChanges();
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  get isEmptyCheckRequired() {
    return this.control && this.required && this.type === 'text';
  }

  applyEmptyCheckValidation() {
    if (this.control && this.control.validator) {
      this.control.setValidators([this.control.validator, this.noWhitespaceValidator.bind(this)]);
      this.control.updateValueAndValidity();
    }
  }

  checkMinMaxValueForNumber() {
    if (this.control && this.control.value) {
      const val = this.control.value;
      if (this.type === 'number') {
        if (val && !R.isNil(this.min) && Number(val) < this.min) {
          this.control.patchValue(this.min);
        }
        if (val && !R.isNil(this.max) && Number(val) < this.max) {
          this.control.patchValue(this.max);
        }
      }

    }
  }

  get canHasMask() {
    return this.type === 'text';
  }

  noWhitespaceValidator(control: AbstractControl) {
    const value = isValueEmpty(control.value) ? '' : control.value;
    const isWhiteSpace = String(value).trim().length === 0;
    const isValid = !isWhiteSpace;
    return isValid ? null : { custom: `Only spaces are not allowed` };
  }

  subscribeValueChanges() {
    this.control.valueChanges.pipe(debounceTime(500)).subscribe(
      (val: any) => {
        this.checkMinMaxValueForNumber();
      }
    )
  }

}
