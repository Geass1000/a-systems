import { AbstractControl } from '@angular/forms';

const rgxEmail : RegExp = new RegExp([
	/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@/,
	/((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
].map( (rgx) => rgx.source ).join(''));

export function isEmail (control : AbstractControl) : { [ key : string ] : any } {
	const field : string = control.value.toString();
	const confirm : boolean = rgxEmail.test(field);
	return confirm ? null : { 'isEmail' : true };
}
