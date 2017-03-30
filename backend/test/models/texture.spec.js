'use strict';
let chai  = require('chai');
let assert = chai.assert;
let expect = chai.expect;

let mongoose = require('mongoose');

let Texture = require('../../app/models/texture.model');

describe('Testing bd a-system', () => {

	describe('Testing collection textures', () => {
		let texture;
		before(() => {
			texture = new Texture({
				"type": "workspace",
		    "url": "https://static.lostfilm.tv/Images/228/Posters/poster.jpg",
		    "size": 80,
		    "amount": 2
			});
		});

		it("Creating document", function(done) {
			texture.save((err, res) => {
				if (err) throw err;
				expect(res).to.equal(texture);
				done(err);
			});
		});
	});
});
