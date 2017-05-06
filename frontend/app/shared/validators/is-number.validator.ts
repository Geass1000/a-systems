import { AbstractControl, ValidatorFn } from '@angular/forms';

let rgxFloat : RegExp = new RegExp(/^[0-9]+(\.[0-9]*)?$/);

export function isNumber (control: AbstractControl): {[key: string]: any} {
	const field = control.value;
	const confirm = rgxFloat.test(field);
	return confirm ? null : { 'isNumber' : true };
}
