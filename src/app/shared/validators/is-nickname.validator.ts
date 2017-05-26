import { AbstractControl } from '@angular/forms';

const rgxNickname : RegExp = new RegExp(/^[A-Za-z0-9\-\_]*$/);

export function isNickname (control : AbstractControl) : { [ key : string ] : any } {
	const field : string = control.value.toString();
	const confirm : boolean = rgxNickname.test(field);
	return confirm ? null : { 'isNickname' : true };
}
