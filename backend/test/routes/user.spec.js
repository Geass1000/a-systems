'use strict';
let chai  = require('chai');
let assert = chai.assert;
let expect = chai.expect;
let should = chai.should();

let chaiHttp = require('chai-http');
chai.use(chaiHttp);

let Server = require('../../app/lib/server.class');

describe('Тестирование маршрутов', () => {
	let server;
	let app;

	before(function () {
		server = Server.bootstrapServer();
		app = server.app;
	});

	it('should list ALL blobs on /blobs GET', (done) => {
		chai.request(app)
			.get('/api/user')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});

	it('GET 404', (done) => {
		chai.request(app)
			.get('/api/use')
			.end((err, res) => {
				res.should.have.status(404);
				done();
			});
	});
});
