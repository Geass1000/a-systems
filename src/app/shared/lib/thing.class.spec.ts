import { Thing, IThing } from './thing.class';

describe('Testing class Thing', function() {
  it('constructor: shouldn\'t created', function() {
		expect(() => { new Thing(); }).toThrowError('Isn\'t element!');
  });
	it('constructor+valueOf: should be created', function() {
		const data : IThing = {
			id : 1,
			x : 10,
			y : 200,
			height : 75,
			width : 140,
			angle : 45,
			url : './assets/itmes/table-1.svg'
		};
		const thing : Thing = new Thing(data);

		expect(thing.valueOf()).toEqual(data);
  });
	it('transform: should return correct value', function() {
		const data : IThing = {
			id : 1,
			x : 10,
			y : 200,
			height : 80,
			width : 140,
			angle : 45,
			url : './assets/itmes/table-1.svg'
		};
		const thing : Thing = new Thing(data);

		expect(thing.transform()).toBe('translate(10,200) rotate(45,70,40)');
		thing.id = 0;
		expect(thing.transform()).toBe('translate(10,200) rotate(45,70,40)');
		thing.height = 100;
		expect(thing.transform()).toBe('translate(10,200) rotate(45,70,50)');
  });
});
