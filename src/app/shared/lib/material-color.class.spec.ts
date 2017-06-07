import { MaterialColor, IMaterialColor } from './material-color.class';
import { IHsla, IRgba } from './color.class';

describe('Testing class MaterialColor', function() {
  it('constructor: shouldn\'t created', function() {
		const data : IMaterialColor = {
			type : 'rgba',
			data : {
				red : 255,
				green : 255,
				blue : 255,
				alfa : 1
			}
		};
		const color : MaterialColor = new MaterialColor();
		expect(color.valueOf()).toEqual(data);
  });
	it('constructor: should be created', function() {
		const data : IMaterialColor = {
			type : 'rgba',
			data : {
				red : 100,
				green : 200,
				blue : 150,
				alfa : 0.5
			}
		};
		const color : MaterialColor = new MaterialColor(data);
		expect(color.valueOf()).toEqual(data);
  });
	it('getColor: should return rgba color-object', function() {
		const data : IMaterialColor = {
			type : 'rgba',
			data : {
				red : 100,
				green : 200,
				blue : 150,
				alfa : 0.5
			}
		};
		const dataRgba : IRgba = {
			red : 100,
			green : 200,
			blue : 150,
			alfa : 0.5
		};
		const color : MaterialColor = new MaterialColor(data);
		expect(color.getColor('rgba').valueOf()).toEqual(dataRgba);
  });
	it('getColor: should return hsla color-object', function() {
		const data : IMaterialColor = {
			type : 'rgba',
			data : {
				red : 100,
				green : 200,
				blue : 150,
				alfa : 0.5
			}
		};
		const dataHsla : IHsla = {
			hue : 150,
			saturation : 48,
			lightness : 59,
			alfa : 0.5
		};
		const color : MaterialColor = new MaterialColor(data);
		expect(color.getColor('hsla').valueOf()).toEqual(dataHsla);
  });
	it('setColor: should set a new color', function() {
		const data : IMaterialColor = {
			type : 'rgba',
			data : {
				red : 100,
				green : 200,
				blue : 150,
				alfa : 0.5
			}
		};
		const colorHsla : IHsla = {
			hue : 235,
			saturation : 76,
			lightness :  43,
			alfa : 0.7
		};
		const color : MaterialColor = new MaterialColor(data);
		expect(color.valueOf()).toEqual(data);
		color.setColor('hsla', colorHsla);
		expect(color.getColor('hsla').valueOf()).toEqual(colorHsla);
	});
	it('toString: should return rgba(100,200,150,0.5)', function() {
		const data : IMaterialColor = {
			type : 'rgba',
			data : {
				red : 100,
				green : 200,
				blue : 150,
				alfa : 0.5
			}
		};
		const color : MaterialColor = new MaterialColor(data);
		expect(color.toString()).toEqual('rgba(100,200,150,0.5)');
	});

});
