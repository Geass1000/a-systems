import { Surface, ISurface } from './surface.class';
import { Material, IMaterial } from './material.class';

describe('Testing class Surface', function() {
	let dataDB : ISurface;
	beforeAll(() => {
		dataDB = {
      id : 0, x : 369, y : 722,
      stroke : {
          type : 'texture',
          data : {
              angle : 0,
              scale : 1,
              defHeight : 400,
              defWidth : 400,
              url : 'stone-2.jpg',
            	iid : '59180610734d1d72a146d658'
          }
      },
      fill : {
          type : 'texture',
          data : {
              angle : 0,
              scale : 0.7,
              defHeight : 600,
              defWidth : 600,
              url : 'wood-2.jpg',
              iid : '59180512734d1d72a146d63f'
          }
      },
      points : [
          { x : 0, y : 0 },
          { x : 500, y : 0 },
          { x : 500, y : 250 },
          { x : 250, y : 250 },
          { x : 250, y : 500 },
          { x : 0, y : 500 }
      ]
		};
	});

	it('constructor+valueOf: should be created empty obj', function() {
		const data : ISurface = {
			id : null,
			x : 0,
			y : 0,
			fill : new Material().valueOf(),
			stroke : new Material().valueOf(),
			points : []
		};
		const surface : Surface = new Surface();
		expect(surface.valueOf()).toEqual(data);
  });
	it('constructor+valueOf: should be created full obj', function() {
		const surface : Surface = new Surface(dataDB);
		expect(surface.valueOf()).toEqual(dataDB);
  });
	it('shoelaceFormula: should return aree of a poligon', function() {
		const surface : Surface = new Surface(dataDB);
		expect(new Surface().shoelaceFormula()).toBe(0, 'Empty surface must be equal 0');
		expect(surface.shoelaceFormula()).toBe(187500, 'Surface must be equal 187500');
  });
	it('poliPoints: should return aree of a poligon', function() {
		const surface : Surface = new Surface(dataDB);
		expect(new Surface().poliPoints()).toBe('', 'Empty surface must return empty string');
		expect(surface.poliPoints()).toBe('0,0 500,0 500,250 250,250 250,500 0,500', 'Surface must not return empty string');
  });
	it('transform: should return correct value', function() {
		const surface : Surface = new Surface(dataDB);
		expect(surface.transform()).toBe('translate(369,722)');
		surface.x = 100;
		expect(surface.transform()).toBe('translate(100,722)');
		surface.y = 349;
		expect(surface.transform()).toBe('translate(100,349)');
  });
});
