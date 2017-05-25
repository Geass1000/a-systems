import { Config } from '../../config';

import { HelperClass } from './helper.class';

import { Point } from './point.class';
import { IMaterial, Material } from './material.class';

export interface IWorkspace {
	x ?: number;
	y ?: number;
	height : number;
	width : number;
	material : IMaterial;
}

export class Workspace implements IWorkspace {
	private _coord : Point;
	private _width : number;
	private _height : number;
	private _material : Material;

	constructor (obj ?: IWorkspace) {
		this._coord = new Point();
		if (obj) {
			this.width = obj.width;
			this.height = obj.height;
			this.material = new Material(obj.material);
			this.x = obj.x || 0;
			this.y = obj.y || 0;
		} else {
			this.width = Config.workspace.width;
			this.height = Config.workspace.height;
			this.material = new Material();
			this.x = 0;
			this.y = 0;
		}
	}

	set x (data : number) {
		this._coord.x = data;
	}
	get x () : number {
		return this._coord.x;
	}
	set y (data : number) {
		this._coord.y = data;
	}
	get y () : number {
		return this._coord.y;
	}
	set width (data : number) {
		this._width = HelperClass.prepareData(data, 0);
	}
	get width () : number {
		return this._width;
	}
	set height (data : number) {
		this._height = HelperClass.prepareData(data, 0);
	}
	get height () : number {
		return this._height;
	}
	set material (data : Material) {
		this._material = data;
	}
	get material () : Material {
		return this._material;
	}

	/**
	 * valueOf - возвращает объектное представление класса.
	 *
	 * @function
	 * @method
	 *
	 * @return {IWorkspace}
	 */
	valueOf () : IWorkspace {
		return {
			x : this.x,
			y : this.y,
			width : this.width,
			height : this.height,
			material : this.material.valueOf()
		};
	}

	/**
	 * transform - возвращает строку для атрибута transform
	 *
	 * @class Workspace
	 * @method
	 *
	 * @return {String}  description
	 */
	transform () {
		return this._coord.transform();
	}
}
