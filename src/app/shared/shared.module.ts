import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { InputErrorComponent } from './input-error/input-error.component';
import { MaterialModule } from '../material/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmBoxComponent } from './confirm-box/confirm-box.component';



@NgModule({
  declarations: [InputComponent, InputErrorComponent, ConfirmBoxComponent],
  imports: [
    CommonModule,
    MaterialModule, FormsModule, ReactiveFormsModule
  ],
  exports: [InputComponent, InputErrorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
