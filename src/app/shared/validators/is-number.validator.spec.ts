import { AbstractControl, ValidatorFn } from '@angular/forms';

import { isNumber } from './is-number.validator';

describe('Testing validator isNumber', () => {
	let isInteger : ValidatorFn;
	let isFloat : ValidatorFn;

	beforeAll(() => {
		isInteger = isNumber(false);
		isFloat = isNumber(true);
	});
	it('isInteger: 0 should be OK', () => {
		expect(isInteger( { value : '9' } as AbstractControl)).toBeNull();
  });
  it('isInteger: 100 should be OK', () => {
		expect(isInteger( { value : '100' } as AbstractControl)).toBeNull();
  });
	it('isInteger: 10 should be OK', () => {
		expect(isInteger( { value : '10' } as AbstractControl)).toBeNull();
  });
	it('isInteger: 9 should be OK', () => {
		expect(isInteger( { value : '9' } as AbstractControl)).toBeNull();
  });
	it('isInteger: 9.5 shouldn\'t be OK', () => {
		expect(isInteger( { value : '9.5' } as AbstractControl)).not.toBeNull();
  });
	it('isInteger: 10.0 shouldn\'t be OK', () => {
		expect(isInteger( { value : '9.5' } as AbstractControl)).not.toBeNull();
  });
	it('isInteger: 0.0 shouldn\'t be OK', () => {
		expect(isInteger( { value : '9.5' } as AbstractControl)).not.toBeNull();
  });
	it('isInteger: Geass shouldn\'t be OK', () => {
		expect(isInteger( { value : 'Geass' } as AbstractControl)).not.toBeNull();
  });
	it('isInteger: w shouldn\'t be OK', () => {
		expect(isInteger( { value : 'w' } as AbstractControl)).not.toBeNull();
  });
	it('isInteger: empty field shouldn\'t be OK', () => {
		expect(isInteger( { value : '' } as AbstractControl)).not.toBeNull();
  });
});
