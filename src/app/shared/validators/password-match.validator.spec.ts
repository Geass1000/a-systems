import { AbstractControl, FormGroup, FormControl } from '@angular/forms';

import { passwordMatch } from './password-match.validator';

describe('Testing validator passwordMatch', function() {
  it('qwerty123 should be equal qwerty123', function() {
		const passwords : FormGroup = new FormGroup({
			password : new FormControl('qwerty123'),
			passwordConfirm : new FormControl('qwerty123')
		});
		expect(passwords.get('password').value).toBe('qwerty123');
		expect(passwords.get('passwordConfirm').value).toBe('qwerty123');
		expect(passwordMatch(passwords)).toBeNull();
  });
	it('qw3 should be equal qw3', function() {
		const passwords : FormGroup = new FormGroup({
			password : new FormControl('qw3'),
			passwordConfirm : new FormControl('qw3')
		});
		expect(passwords.get('password').value).toBe('qw3');
		expect(passwords.get('passwordConfirm').value).toBe('qw3');
		expect(passwordMatch(passwords)).toBeNull();
  });
	it('qwerty123 shouldn\'t be equal qwerty1234', function() {
		const passwords : FormGroup = new FormGroup({
			password : new FormControl('qwerty123'),
			passwordConfirm : new FormControl('qwerty1234')
		});
		expect(passwords.get('password').value).toBe('qwerty123');
		expect(passwords.get('passwordConfirm').value).toBe('qwerty1234');
		console.log(passwordMatch(passwords));
		expect(passwordMatch(passwords)).not.toBeNull();
  });
});
