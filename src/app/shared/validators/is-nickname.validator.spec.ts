import { AbstractControl } from '@angular/forms';

import { isNickname } from './is-nickname.validator';

describe('Testing validator isNickname', function() {
  it('Gea should be OK', function() {
		expect(isNickname( { value : 'Gea' } as AbstractControl)).toBeNull();
  });
	it('Geass should be OK', function() {
		expect(isNickname( { value : 'Geass' } as AbstractControl)).toBeNull();
  });
	it('Andrey should be OK', function() {
		expect(isNickname( { value : 'Andrey' } as AbstractControl)).toBeNull();
	});
	it('Geass1000 should be OK', function() {
		expect(isNickname( { value : 'Geass1000' } as AbstractControl)).toBeNull();
	});
	it('ge@ shouldn\'t be OK', function() {
		expect(isNickname( { value : 'ge@' } as AbstractControl)).not.toBeNull();
	});
	it('geass! shouldn\'t be OK', function() {
		expect(isNickname( { value : 'geass!' } as AbstractControl)).not.toBeNull();
	});
});
