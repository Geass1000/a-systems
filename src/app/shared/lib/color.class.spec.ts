import { Rgba, IRgba, Hsla, IHsla, Hex, IHex } from './color.class';

describe('Testing class Rgba', function() {
	let color : Rgba;

  it('constructor: should display rgba color 255,255,255,1', function() {
		color = new Rgba();
    expect(color.red).toBe(255);
		expect(color.green).toBe(255);
		expect(color.blue).toBe(255);
		expect(color.alfa).toBe(1);
  });
	it('constructor: should display rgba color 100,200,150,0.7', function() {
		color = new Rgba({
			red : 100,
			green : 200,
			blue : 150,
			alfa : 0.7
		});
    expect(color.red).toBe(100);
		expect(color.green).toBe(200);
		expect(color.blue).toBe(150);
		expect(color.alfa).toBe(0.7);
  });
	it('setColor: should display rgba color 200,150,100,0.5', function() {
		color = new Rgba({
			red : 100,
			green : 200,
			blue : 150,
			alfa : 0.7
		});
		color.setColor(200, 150, 100, 0.5);
    expect(color.red).toBe(200);
		expect(color.green).toBe(150);
		expect(color.blue).toBe(100);
		expect(color.alfa).toBe(0.5);
  });
	it('setColor: should display rgba color 100,0,200,0.5', function() {
		color = new Rgba();
		color.setColor(200, -100, 100, 0.5);
    expect(color.red).toBe(200);
		expect(color.green).toBe(0);
		expect(color.blue).toBe(100);
		expect(color.alfa).toBe(0.5);
  });
	it('setColor: should display rgba color 100,255,200,0.5', function() {
		color = new Rgba();
		color.setColor(200, 500, 100, 0.5);
    expect(color.red).toBe(200);
		expect(color.green).toBe(255);
		expect(color.blue).toBe(100);
		expect(color.alfa).toBe(0.5);
  });
	it('toString: should display rgba color', function() {
		color = new Rgba();
    expect(color.toString()).toBe('rgba(255,255,255,1)');
		color.setColor(200, 500, 100, 0.5);
		expect(color.toString()).toBe('rgba(200,255,100,0.5)');
  });
	it('valueOf: should display rgba color', function() {
		color = new Rgba();
		let colorVal : IRgba = color.valueOf();
    expect(colorVal.red).toBe(255);
		expect(colorVal.green).toBe(255);
		expect(colorVal.blue).toBe(255);
		expect(colorVal.alfa).toBe(1);
		color.setColor(200, 500, 100, 0.5);
		colorVal = color.valueOf();
		expect(colorVal.red).toBe(200);
		expect(colorVal.green).toBe(255);
		expect(colorVal.blue).toBe(100);
		expect(colorVal.alfa).toBe(0.5);
  });
});

describe('Testing class Hsla', function() {
	let color : Hsla;

  it('constructor: should display hsla color 255,255,255,1', function() {
		color = new Hsla();
    expect(color.hue).toBe(0);
		expect(color.saturation).toBe(100);
		expect(color.lightness).toBe(100);
		expect(color.alfa).toBe(1);
  });
	it('constructor: should display hsla color 100,200,150,0.7', function() {
		color = new Hsla({
			hue : 100,
			saturation : 200,
			lightness : 150,
			alfa : 0.7
		});
    expect(color.hue).toBe(100);
		expect(color.saturation).toBe(100);
		expect(color.lightness).toBe(100);
		expect(color.alfa).toBe(0.7);
  });
	it('setColor: should display hsla color 200,150,100,0.5', function() {
		color = new Hsla({
			hue : 100,
			saturation : 200,
			lightness : 150,
			alfa : 0.7
		});
		color.setColor(200, 150, 70, 0.5);
    expect(color.hue).toBe(200);
		expect(color.saturation).toBe(100);
		expect(color.lightness).toBe(70);
		expect(color.alfa).toBe(0.5);
  });
	it('setColor: should display hsla color 100,0,200,0.5', function() {
		color = new Hsla();
		color.setColor(200, -100, 40, 0.5);
    expect(color.hue).toBe(200);
		expect(color.saturation).toBe(0);
		expect(color.lightness).toBe(40);
		expect(color.alfa).toBe(0.5);
  });
	it('setColor: should display hsla color 100,255,200,0.5', function() {
		color = new Hsla();
		color.setColor(200, 500, 100, 0.5);
    expect(color.hue).toBe(200);
		expect(color.saturation).toBe(100);
		expect(color.lightness).toBe(100);
		expect(color.alfa).toBe(0.5);
  });
	it('toString: should display hsla color', function() {
		color = new Hsla();
    expect(color.toString()).toBe('hsla(0,100%,100%,1)');
		color.setColor(200, 500, 100, 0.5);
		expect(color.toString()).toBe('hsla(200,100%,100%,0.5)');
  });
	it('valueOf: should display hsla color', function() {
		color = new Hsla();
		let colorVal : IHsla = color.valueOf();
    expect(colorVal.hue).toBe(0);
		expect(colorVal.saturation).toBe(100);
		expect(colorVal.lightness).toBe(100);
		expect(colorVal.alfa).toBe(1);
		color.setColor(200, 500, 100, 0.5);
		colorVal = color.valueOf();
		expect(colorVal.hue).toBe(200);
		expect(colorVal.saturation).toBe(100);
		expect(colorVal.lightness).toBe(100);
		expect(colorVal.alfa).toBe(0.5);
  });
});

describe('Testing class Hex', function() {
	let color : Hex;

  it('constructor: should display hex color ffffff,1', function() {
		color = new Hex();
    expect(color.hex).toBe('ffffff');
		expect(color.alfa).toBe(1);
  });
	it('constructor: should display hex color ffe4e4,0.4', function() {
		color = new Hex({
			hex : 'ffe4e4',
			alfa : 0.4
		});
    expect(color.hex).toBe('ffe4e4');
		expect(color.alfa).toBe(0.4);
  });
	it('setColor: should display hex color adf123,0.5', function() {
		color = new Hex({
			hex : 'ffe4e4',
			alfa : 0.7
		});
		color.setColor('adf123', 0.5);
		expect(color.hex).toBe('adf123');
		expect(color.alfa).toBe(0.5);
  });
	it('setColor: should display hsla color ffffff,0.5 ; ffffff,0.4', function() {
		color = new Hex();
		color.setColor('adh123', 0.5);
		expect(color.hex).toBe('ffffff');
		expect(color.alfa).toBe(0.5);
		color.setColor('adff123', 0.4);
		expect(color.hex).toBe('ffffff');
		expect(color.alfa).toBe(0.4);
  });
	it('toString: should display hex color', function() {
		color = new Hex();
    expect(color.toString()).toBe('#ffffff');
		color.setColor('adf123', 0.5);
		expect(color.toString()).toBe('#adf123');
  });
	it('valueOf: should display hex color', function() {
		color = new Hex();
		let colorVal : IHex = color.valueOf();
    expect(colorVal.hex).toBe(color.hex);
		expect(colorVal.alfa).toBe(color.alfa);
		color.setColor('adf123', 0.5);
		colorVal = color.valueOf();
		expect(colorVal.hex).toBe('adf123');
		expect(colorVal.alfa).toBe(0.5);
  });
});
