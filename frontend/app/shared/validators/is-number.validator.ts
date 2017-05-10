import { AbstractControl, ValidatorFn } from '@angular/forms';

let rgxFloat : RegExp = new RegExp(/^[0-9]+(\.[0-9]*)?$/);
let rgxInteger : RegExp = new RegExp(/^[0-9]+$/);

export function isNumber (isFloat : boolean = true) : ValidatorFn {
	let rgx : RegExp = isFloat ? rgxFloat : rgxInteger;
  return (control: AbstractControl): {[key: string]: any} => {
		const field = control.value;
		const confirm = rgx.test(field);
		return confirm ? null : { 'isNumber' : true };
  };
}
