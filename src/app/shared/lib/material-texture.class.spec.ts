import { MaterialTexture, IMaterialTexture } from './material-texture.class';
import { IHsla, IRgba } from './color.class';

describe('Testing class MaterialTexture', function() {
  it('constructor+valueOf: should be created empty obj', function() {
		const data : IMaterialTexture = {
			iid : '',
			url : '',
			defWidth : 0,
			defHeight : 0,
			scale : 1,
			angle : 0
		};
		const color : MaterialTexture = new MaterialTexture();
		expect(color.valueOf()).toEqual(data);
  });
	it('constructor+valueOf: should be created', function() {
		const data : IMaterialTexture = {
			iid : '59181f44734d1d72a146da89',
			url : 'ground-1.jpg',
			defWidth : 600,
			defHeight : 600,
			scale : 0.5,
			angle : 0
		};
		const color : MaterialTexture = new MaterialTexture(data);
		expect(color.valueOf()).toEqual(data);
  });
	it('scale: should return a low size', function() {
		const data : IMaterialTexture = {
			iid : '59181f44734d1d72a146da89',
			url : 'ground-1.jpg',
			defWidth : 600,
			defHeight : 400,
			scale : 0.5,
			angle : 0
		};
		const color : MaterialTexture = new MaterialTexture(data);
		expect(color.width).toEqual(300);
		expect(color.height).toEqual(200);
  });
	it('scale: should return a great size', function() {
		const data : IMaterialTexture = {
			iid : '59181f44734d1d72a146da89',
			url : 'ground-1.jpg',
			defWidth : 600,
			defHeight : 400,
			scale : 1.5,
			angle : 0
		};
		const color : MaterialTexture = new MaterialTexture(data);
		expect(color.width).toEqual(900);
		expect(color.height).toEqual(600);
  });
	it('getSrc: Test 1 - should return valid url', function() {
		const data : IMaterialTexture = {
			iid : '59181f44734d1d72a146da89',
			url : 'ground-1.jpg',
			defWidth : 600,
			defHeight : 400,
			scale : 1.5,
			angle : 0
		};
		const color : MaterialTexture = new MaterialTexture(data);
		expect(color.getSrc()).toEqual(`${location.protocol}//${location.host}/assets/textures/${data.url}`);
  });
	it('getSrc: Test 2 - should return empty url', function() {
		const data : IMaterialTexture = {
			iid : '59181f44734d1d72a146da89',
			url : '',
			defWidth : 600,
			defHeight : 400,
			scale : 1.5,
			angle : 0
		};
		const color : MaterialTexture = new MaterialTexture(data);
		expect(color.getSrc()).toEqual('');
  });
});
