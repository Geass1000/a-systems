'use strict';
let chai  = require('chai');
let assert = chai.assert;
let expect = chai.expect;

let UserValidator = require('../../app/validators/user.validator');

/*
describe('Testing UserValidator', () => {

	it('Method isEmail', () => {
		// True
		expect(UserValidator.isEmail('geass1000@gmail.com')).to.equal(true);
		expect(UserValidator.isEmail('g@mail.ru')).to.equal(true);
		// False
		expect(UserValidator.isEmail('geass1000gmail.com')).to.equal(false);
		expect(UserValidator.isEmail('geass1000@gmail.')).to.equal(false);
		expect(UserValidator.isEmail('geass1000@gmail')).to.equal(false);
		expect(UserValidator.isEmail('')).to.equal(false);
		expect(UserValidator.isEmail(1)).to.equal(false);
		expect(UserValidator.isEmail()).to.equal(false);
	});

	it('Method isLogin', () => {
		// True
		expect(UserValidator.isLogin('012345678901234567891234')).to.equal(true);
		expect(UserValidator.isLogin('geass')).to.equal(true);
		expect(UserValidator.isLogin('geass-ok')).to.equal(true);
		expect(UserValidator.isLogin('geass_123')).to.equal(true);
		// False
		//expect(UserValidator.isLogin('0123456789012345678912345')).to.equal(false);
		expect(UserValidator.isLogin('geass1000gmail.com')).to.equal(false);
		expect(UserValidator.isLogin('at')).to.equal(false);
		expect(UserValidator.isLogin('')).to.equal(false);
		expect(UserValidator.isLogin(1234)).to.equal(false);
		expect(UserValidator.isLogin()).to.equal(false);
	});

	it('Method isPassword', () => {
		// True
		expect(UserValidator.isPassword('012345678901234567891234')).to.equal(true);
		expect(UserValidator.isPassword('asdfg123')).to.equal(true);
		expect(UserValidator.isPassword('Asdfg123')).to.equal(true);
		expect(UserValidator.isPassword('AaSsDdF')).to.equal(true);
		// False
		expect(UserValidator.isPassword('0123456789012345678912345')).to.equal(false);
		expect(UserValidator.isPassword('123')).to.equal(false);
		expect(UserValidator.isPassword('asdfg')).to.equal(false);
		expect(UserValidator.isPassword('')).to.equal(false);
		expect(UserValidator.isPassword(1234)).to.equal(false);
		expect(UserValidator.isPassword()).to.equal(false);
	});
});
*/
