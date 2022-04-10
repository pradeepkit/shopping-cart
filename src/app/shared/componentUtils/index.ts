import { FormControl, FormGroup } from "@angular/forms";

export { InputErrorStateMatcher, getError } from './inputErrorStateMacher'

export const DEFAULT_CONTROL_NAME = 'default';

export const DEFAULT_FORM_GROUP: FormGroup = new FormGroup({
    [DEFAULT_CONTROL_NAME]: new FormControl('default'),
})