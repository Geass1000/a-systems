import { Workspace, IWorkspace } from './workspace.class';
import { Material, IMaterial } from './material.class';
import { Config } from '../../config';

describe('Testing class Thing', function() {
	it('constructor+valueOf: should be created empty obj', function() {
		const data : IWorkspace = {
			width : Config.workspace.width,
			height : Config.workspace.height,
			x : 0,
			y : 0,
			material : new Material().valueOf()
		};
		const workspace : Workspace = new Workspace();
		expect(workspace.valueOf()).toEqual(data);
  });
	it('constructor+valueOf: should be created empty obj', function() {
		const material : IMaterial = {
			type : 'color',
			data : {
				type : 'rgba',
				data : {
					red : 100, green : 200, blue : 150, alfa : 0.5
				}
			}
		};
		const data : IWorkspace = {
			width : 2000,
			height : 1000,
			x : 200,
			y : 300,
			material : new Material(material).valueOf()
		};
		const workspace : Workspace = new Workspace(data);
		expect(workspace.valueOf()).toEqual(data);
  });
	it('transform: should return correct value', function() {
		const data : IWorkspace = {
			width : 2000,
			height : 1000,
			x : 200,
			y : 300,
			material : new Material().valueOf()
		};
		const workspace : Workspace = new Workspace(data);
		expect(workspace.valueOf()).toEqual(data);

		expect(workspace.transform()).toBe('translate(200,300)');
		workspace.x = 200;
		expect(workspace.transform()).toBe('translate(200,300)');
		workspace.x = 400;
		expect(workspace.transform()).toBe('translate(400,300)');
  });
});
