import { AbstractControl, ValidatorFn } from '@angular/forms';

const rgxFloat : RegExp = new RegExp(/^[0-9]+(\.[0-9]*)?$/);
const rgxInteger : RegExp = new RegExp(/^[0-9]+$/);

export function isNumber (isFloat : boolean = true) : ValidatorFn {
	const rgx : RegExp = isFloat ? rgxFloat : rgxInteger;
  return (control : AbstractControl) : { [ key : string ] : any } => {
		const field = control.value;
		const confirm = rgx.test(field);
		return confirm ? null : { 'isNumber' : true };
  };
}
