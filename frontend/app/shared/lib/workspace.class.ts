import { Config } from '../../config';

import { Point } from './point.class';
import { IMaterial, Material } from './material.class';

export interface IWorkspace {
	height : number;
	width : number;
	material : IMaterial;
	x ?: number;
	y ?: number;
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
			this.material = obj.material ? new Material(obj.material) : new Material();
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
		this._width = this.prepareNumberData(data);
	}
	get width () : number {
		return this._width;
	}
	set height (data : number) {
		this._height = this.prepareNumberData(data);
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
	prepareNumberData (data : number) : number {
		return isFinite(data) ? data : 0;
	}

	/**
	 * valueOf - функция, возвращающая объектное представление класса.
	 *
	 * @kind {function}
	 * @return {IWorkspace}
	 */
	valueOf () : IWorkspace {
		return {
			x : this.x,
			y : this.y,
			width : this.width,
			height : this.height,
			material : this.material
		};
	}

	/**
	 * transform - возвращает строку для атрибута transform
	 *
	 * @class Workspace
	 * @return {String}  description
	 */
	transform () {
		return this._coord.transform();
	}
}
