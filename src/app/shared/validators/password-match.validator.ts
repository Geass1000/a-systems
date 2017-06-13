import { FormGroup } from '@angular/forms';

export function passwordMatch (controlGroup : FormGroup) : { [ key : string ] : any } {
	const password = controlGroup.get('password');
	const passwordConfirm = controlGroup.get('passwordConfirm');
	return password.value === passwordConfirm.value ? null : { 'mismatch' : true };
}
