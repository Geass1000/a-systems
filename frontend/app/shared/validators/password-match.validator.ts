import { FormGroup } from '@angular/forms';

export function passwordMatch (controlGroup : FormGroup) : { [ key : string ] : any } {
	let password = controlGroup.get('password');
	let passwordConfirm = controlGroup.get('passwordConfirm');
	return password.value === passwordConfirm.value ||
		!password.dirty || !passwordConfirm.dirty
		? null : { 'mismatch' : true };
}
