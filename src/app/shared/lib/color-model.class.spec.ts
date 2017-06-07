import { ColorModel } from './color-model.class';
import { IRgba, Rgba, IHsla, Hsla, IHex, Hex } from './color.class';

describe('Testing class ColorModel', function() {
	it('typeDefinition: should return \'rgba\'', function() {
		const color : Rgba = new Rgba({
			red : 100,
			green : 200,
			blue : 150,
			alfa : 0.7
		});
		expect(ColorModel.typeDefinition(new Rgba().toString())).toBe('rgba');
		expect(ColorModel.typeDefinition(color.toString())).toBe('rgba');
	});
	it('typeDefinition: should return \'hsla\'', function() {
		const color : Hsla = new Hsla({
			hue : 100,
			saturation : 200,
			lightness : 150,
			alfa : 0.7
		});
		expect(ColorModel.typeDefinition(new Hsla().toString())).toBe('hsla');
		expect(ColorModel.typeDefinition(color.toString())).toBe('hsla');
	});
	it('typeDefinition: should return \'hex\'', function() {
		const color : Hex = new Hex({
			hex : 'afa6a7',
			alfa : 0.7
		});
		expect(ColorModel.typeDefinition(new Hex().toString())).toBe('hex');
		expect(ColorModel.typeDefinition(color.toString())).toBe('hex');
	});
	it('hexToRgba: Test 1 - should return new rgba value 255,255,255,1', function() {
		const color : Hex = new Hex();
		const tmp : IRgba = ColorModel.hexToRgba(color.valueOf());
		expect(tmp.red).toBe(255);
		expect(tmp.green).toBe(255);
		expect(tmp.blue).toBe(255);
		expect(tmp.alfa).toBe(1);
	});
	it('hexToRgba: Test 2 - should return new rgba value 175,166,167,0.7', function() {
		const color : Hex = new Hex({
			hex : 'afa6a7',
			alfa : 0.7
		});
		const tmp : IRgba = ColorModel.hexToRgba(color.valueOf());
		expect(tmp.red).toBe(175);
		expect(tmp.green).toBe(166);
		expect(tmp.blue).toBe(167);
		expect(tmp.alfa).toBe(0.7);
	});
	it('rgbaToHex: Test 1 - should return new hex value ffffff,1', function() {
		const color : Rgba = new Rgba();
		const tmp : IHex = ColorModel.rgbaToHex(color.valueOf());
		expect(tmp.hex).toBe('ffffff');
		expect(tmp.alfa).toBe(1);
	});
	it('rgbaToHex: Test 2 - should return new hex value afa6a7,0.7', function() {
		const color : Rgba = new Rgba({
			red : 175,
			green : 166,
			blue : 167,
			alfa : 0.7
		});
		const tmp : IHex = ColorModel.rgbaToHex(color.valueOf());
		expect(tmp.hex).toBe('afa6a7');
		expect(tmp.alfa).toBe(0.7);
	});
	it('hslaToRgba: Test 1 - should return new rgba value 255,255,255,1', function() {
		const color : Hsla = new Hsla();
		const tmp : IRgba = ColorModel.hslaToRgba(color.valueOf());
		expect(tmp.red).toBe(255);
		expect(tmp.green).toBe(255);
		expect(tmp.blue).toBe(255);
		expect(tmp.alfa).toBe(1);
	});
	it('hslaToRgba: Test 2 - should return new rgba value 175,166,167,0.7', function() {
		const color : Hsla = new Hsla({
			hue : 353,
			saturation : 5,
			lightness : 67,
			alfa : 0.7
		});
		const tmp : IRgba = ColorModel.hslaToRgba(color.valueOf());
		expect(tmp.red).toBe(175);
		expect(tmp.green).toBe(166);
		expect(tmp.blue).toBe(167);
		expect(tmp.alfa).toBe(0.7);
	});
	it('rgbaToHsla: Test 1 - should return new hsla value 0,0,100,1', function() {
		const color : Rgba = new Rgba();
		const tmp : IHsla = ColorModel.rgbaToHsla(color.valueOf());
		expect(tmp.hue).toBe(0);
		expect(tmp.saturation).toBe(0);
		expect(tmp.lightness).toBe(100);
		expect(tmp.alfa).toBe(1);
	});
	it('rgbaToHsla: Test 2 - should return new hsla value 353,5,67,0.7', function() {
		const color : Rgba = new Rgba({
			red : 175,
			green : 166,
			blue : 167,
			alfa : 0.7
		});
		const tmp : IHsla = ColorModel.rgbaToHsla(color.valueOf());
		expect(tmp.hue).toBe(353);
		expect(Math.round(tmp.saturation)).toBe(5);
		expect(Math.round(tmp.lightness)).toBe(67);
		expect(tmp.alfa).toBe(0.7);
	});

});
