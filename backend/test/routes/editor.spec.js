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

	it('PUT: добавление текстуры', (done) => {
		chai.request(app)
			.put('/api/texture')
			.send({
				"type": "workspace",
				"url": "https://static.lostfilm.tv/Images/228/Posters/poster.jpg",
				"size": 80,
				"amount": 2
			})
			.end((err, res) => {
				console.log(res.body);
				if (res.status === 201) {
					expect(res).to.have.status(201);
					token = res.body.token;
				}
				done();
			});
	});
});
