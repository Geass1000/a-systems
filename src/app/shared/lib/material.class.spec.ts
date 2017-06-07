import { Material, IMaterial } from './material.class';
import { IHsla, IRgba } from './color.class';

describe('Testing class MaterialTexture', function() {
  it('constructor+valueOf: should be created color material', function() {
		const data : IMaterial = {
			type : 'color',
			data : {
				type : 'rgba',
				data : {
					red : 255, green : 255, blue : 255, alfa : 1
				}
			}
		};
		const material : Material = new Material();
		expect(material.valueOf()).toEqual(data);
  });
	it('constructor+valueOf: should be created color material', function() {
		const data : IMaterial = {
			type : 'color',
			data : {
				type : 'rgba',
				data : {
					red : 100, green : 200, blue : 150, alfa : 0.5
				}
			}
		};
		const material : Material = new Material(data);
		expect(material.valueOf()).toEqual(data);
  });
	it('isType: should be color', function() {
		const material : Material = new Material();
		expect(material.isType('color')).toBe(true, 'Is color');
		expect(material.isType('texture')).toBe(false, 'Is texture');
		expect(material.isType('none')).toBe(false, 'Is none');
  });
	it('isType: should be texture', function() {
		const data : IMaterial = {
			type : 'texture',
			data : {
				iid : '', url : '', defWidth : 0, defHeight : 0, scale : 1,	angle : 0
			}
		};
		const material : Material = new Material(data);
		expect(material.isType('color')).toBe(false, 'Is color');
		expect(material.isType('texture')).toBe(true, 'Is texture');
		expect(material.isType('none')).toBe(false, 'Is none');
  });
	it('isType: should be none', function() {
		const data : IMaterial = {
			type : 'none',
			data : null
		};
		const material : Material = new Material(data);
		expect(material.isType('color')).toBe(false, 'Is color');
		expect(material.isType('texture')).toBe(false, 'Is texture');
		expect(material.isType('none')).toBe(true, 'Is none');
  });
	it('setType: should be texture', function() {
		const data : IMaterial = {
			type : 'none',
			data : null
		};
		const material : Material = new Material(data);
		material.setType('texture');
		expect(material.isType('color')).toBe(false, 'Is color');
		expect(material.isType('texture')).toBe(true, 'Is texture');
		expect(material.isType('none')).toBe(false, 'Is none');
  });
});
