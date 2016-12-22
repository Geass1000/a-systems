'use strict';
let chai  = require('chai');
let assert = chai.assert;
let expect = chai.expect;

let mongoose = require('mongoose');

let User = require('../../app/models/user.model');

describe('Testing bd a-system', () => {

	describe('Testing collection users', () => {
		let user;
		before(() => {
			user = new User({
				login : 'Test',
				password : '1234qwe',
				email : 'geass1000@gmail.com'
			});
		});

		it("Creating document", function(done) {
			user.save((err, res) => {
				if (err) throw err;
				expect(res).to.equal(user);
				done(err);
			});
		});
		it("Finding document", function(done) {
			User.findOne({	login : 'Test' }, '+password', (err, res) => {
				if (err) throw err;
				expect(res.login).to.equal(user.login);
				expect(res.password).to.equal(user.password);
				expect(res.created_at.toString()).to.equal(user.created_at.toString());
				done(err);
			});
		});
		it("Deleting document", function(done) {
			User.remove({
				login : 'Test',
				password : '1234qwe'
			}, (err, res) => {
				expect(err).to.be.a('null');
				done(err);
			});
		});
	});
});
