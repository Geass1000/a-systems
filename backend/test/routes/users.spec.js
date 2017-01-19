'use strict';
let chai  = require('chai');
let assert = chai.assert;
let expect = chai.expect;

let chaiHttp = require('chai-http');
chai.use(chaiHttp);

let Server = require('../../app/lib/server.class');

describe('Testing routes api/', () => {
	let server;
	let app;
	let token;

	before(function () {
		server = Server.bootstrapServer();
		app = server.app;
	});

	it('POST: sign up user', (done) => {
		chai.request(app)
			.post('/api/users')
			.send({'login' : 'Geass', 'email' : 'geass1000@gmail.com', 'password' : 'asdfg123'})
			.end((err, res) => {
				console.log(res.body);
				if (res.status === 201) {
					expect(res).to.have.status(201);
					token = res.body.token;
				}
				done();
			});
	});

	it('POST: create JWT token session', (done) => {
		chai.request(app)
			.post('/api/session')
			.send({'login' : 'Geass', 'email' : 'geass1000@gmail.com', 'password' : 'asdfg123'})
			.end((err, res) => {
				console.log(res.body);
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('token');
				if (res.status === 200)
					token = res.body.token;
				done();
			});
	});

	it('GET: get user data with id 1', (done) => {
		chai.request(app)
			.get('/api/users/1')
			.set('authorization', 'Bearer ' + token)
			.end((err, res) => {
				expect(res).to.have.status(200);
				
				done();
			});
	});
});
