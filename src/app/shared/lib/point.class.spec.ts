import { Point, IPoint } from './point.class';

describe('Testing class Point', function() {
	let pt : Point;

  it('constructor: should display point at [0,0]', function() {
		pt = new Point();
    expect(pt.x).toBe(0);
		expect(pt.y).toBe(0);
  });
	it('constructor: should display point at [10,200]', function() {
		pt = new Point({ x : 10, y : 200 });
    expect(pt.x).toBe(10);
		expect(pt.y).toBe(200);
  });
	it('valueOf: should return IPoint with { x : 10, y : 200 }', function() {
		pt = new Point({ x : 10, y : 200 });
		const ptVal : IPoint = pt.valueOf();
    expect(ptVal.x).toBe(pt.x);
		expect(ptVal.y).toBe(pt.y);
  });
	it('toString: should return string with \'10,200\'', function() {
		pt = new Point({ x : 10, y : 200 });
		const ptStr : string = pt.toString();
    expect(ptStr).toBe(`${pt.x},${pt.y}`);
  });
	it('transform: should return string with \'translate(10,200)\'', function() {
		pt = new Point({ x : 10, y : 200 });
		const ptStr : string = pt.transform();
    expect(ptStr).toBe(`translate(${pt.x},${pt.y})`);
  });
});
