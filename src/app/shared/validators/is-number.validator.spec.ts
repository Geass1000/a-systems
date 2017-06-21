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
		expect(isInteger( { value : '10.0' } as AbstractControl)).not.toBeNull();
  });
	it('isInteger: 0.0 shouldn\'t be OK', () => {
		expect(isInteger( { value : '0.0' } as AbstractControl)).not.toBeNull();
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

	it('isFloat: 0 should be OK', () => {
		expect(isFloat( { value : '9' } as AbstractControl)).toBeNull();
  });
  it('isFloat: 100 should be OK', () => {
		expect(isFloat( { value : '100' } as AbstractControl)).toBeNull();
  });
	it('isFloat: 10 should be OK', () => {
		expect(isFloat( { value : '10' } as AbstractControl)).toBeNull();
  });
	it('isFloat: 9 should be OK', () => {
		expect(isFloat( { value : '9' } as AbstractControl)).toBeNull();
  });
	it('isFloat: 9.5 should be OK', () => {
		expect(isFloat( { value : '9.5' } as AbstractControl)).toBeNull();
  });
	it('isFloat: 10.0 should be OK', () => {
		expect(isFloat( { value : '10.0' } as AbstractControl)).toBeNull();
  });
	it('isFloat: 0.0 should be OK', () => {
		expect(isFloat( { value : '0.0' } as AbstractControl)).toBeNull();
  });
	it('isFloat: Geass shouldn\'t be OK', () => {
		expect(isFloat( { value : 'Geass' } as AbstractControl)).not.toBeNull();
  });
	it('isFloat: w shouldn\'t be OK', () => {
		expect(isFloat( { value : 'w' } as AbstractControl)).not.toBeNull();
  });
	it('isFloat: empty field shouldn\'t be OK', () => {
		expect(isFloat( { value : '' } as AbstractControl)).not.toBeNull();
  });

});
