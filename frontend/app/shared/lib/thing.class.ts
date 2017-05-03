import { Point } from './point.class';

export interface IThing {
	id ?: number;
	height : number;
	width : number;
	x ?: number;
	y ?: number;
	url : string;
}

export class Thing implements IThing {
	private _id : number;
	private _coord : Point;
	private _width : number;
	private _height : number;
	private _url : string;

	constructor (obj ?: IThing) {
		this._coord = new Point();
		if (obj) {
			this.width = obj.width;
			this.height = obj.height;
			this.x = obj.x || 0;
			this.y = obj.y || 0;
			this.id = obj.id || null;
			this.url = obj.url || '';
		} else {
			throw new Error('Isn\'t element!');
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
	set id (data : number) {
		this._id = this.prepareNumberData(data);
	}
	get id () : number {
		return this._id;
	}
	set url (data : string) {
		this._url = data;
	}
	get url () : string {
		return this._url;
	}
	prepareNumberData (data : number) : number {
		return isFinite(data) ? data : 0;
	}

	valueOf () : IThing {
		return {
			width : this.width,
			height : this.height,
			url : this.url,
			x : this.x,
			y : this.y
		};
	}

	/**
	 * transform - возвращает строку для атрибута transform
	 *
	 * @class Thing
	 * @return {String}  description
	 */
	transform () {
		return this._coord.transform();
	}
}
