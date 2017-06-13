import { AbstractControl } from '@angular/forms';

import { isEmail } from './is-email.validator';

describe('Testing validator isEmail', function() {
  it('geass1000@gmail.com should be OK', function() {
		expect(isEmail( { value : 'geass1000@gmail.com' } as AbstractControl)).toBeNull();
  });
	it('asdfg@gmail.com should be OK', function() {
		expect(isEmail( { value : 'asdfg@gmail.com' } as AbstractControl)).toBeNull();
  });
	it('gs1000@gmail.com should be OK', function() {
		expect(isEmail( { value : 'gs1000@gmail.com' } as AbstractControl)).toBeNull();
	});
	it('gs1000@.com shouldn\'t be OK', function() {
		expect(isEmail( { value : 'gs1000@.com' } as AbstractControl)).not.toBeNull();
	});
	it('geass1000gmail.com shouldn\'t be OK', function() {
		expect(isEmail( { value : 'geass1000gmail.com' } as AbstractControl)).not.toBeNull();
	});
	it('geass1000@gmail shouldn\'t be OK', function() {
		expect(isEmail( { value : 'geass1000@gmail' } as AbstractControl)).not.toBeNull();
	});
	it('geass1000@gmail. shouldn\'t be OK', function() {
		expect(isEmail( { value : 'geass1000@gmail.' } as AbstractControl)).not.toBeNull();
	});
	it('geass1000@gmail.c shouldn\'t be OK', function() {
		expect(isEmail( { value : 'geass1000@gmail.c' } as AbstractControl)).not.toBeNull();
	});
	it('geass(1000)@gmail.com shouldn\'t be OK', function() {
		expect(isEmail( { value : 'geass(1000)@gmail.com' } as AbstractControl)).not.toBeNull();
	});
});
