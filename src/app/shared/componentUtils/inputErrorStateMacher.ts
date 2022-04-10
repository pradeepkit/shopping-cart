import { AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as R from 'ramda';

export const getError = (formErrors: any) => R.pipe(
    R.keys,
    R.intersection(formErrors),
    R.head,
);

export class InputErrorStateMatcher implements ErrorStateMatcher {
    formErrors: string[];

    constructor(formErrors: any) {
        this.formErrors = formErrors;
    }

    isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        const hasControlErrors: any = (control && control.invalid && (control.dirty || control.touched || isSubmitted));
        const formErrors = !!this.formErrors && !!form?.errors && !!getError(this.formErrors)(form.errors);
        const hasFormErrors = (control && form?.invalid && (control.dirty || control.touched || isSubmitted) && formErrors);
        return hasControlErrors || hasFormErrors;
    }
}
