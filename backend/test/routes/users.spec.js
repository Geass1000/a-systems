'use strict';
let chai  = require('chai');
let assert = chai.assert;
let expect = chai.expect;
let should = chai.should();

let chaiHttp = require('chai-http');
chai.use(chaiHttp);

let Server = require('../../app/lib/server.class');

describe('Testing route api/users', () => {
	let server;
	let app;

	before(function () {
		server = Server.bootstrapServer();
		app = server.app;
	});

	it('GET without parameter', (done) => {
		chai.request(app)
			.get('/api/users')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});

	it('POST without parameter', (done) => {
		chai.request(app)
			.post('/api/users')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});

	it('GET with parameter', (done) => {
		chai.request(app)
			.get('/api/users/1')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});

	it('PUT with parameter', (done) => {
		chai.request(app)
			.put('/api/users/1')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});

	it('DELETE with parameter', (done) => {
		chai.request(app)
			.delete('/api/users/1')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
});
