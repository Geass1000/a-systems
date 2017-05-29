import { HelperClass } from './helper.class';

import { Point } from './point.class';

export interface IThing {
	id ?: number;
	x ?: number;
	y ?: number;
	height : number;
	width : number;
	angle : number;
	url : string;
}

export class Thing implements IThing {
	private _id : number;
	private _coord : Point;
	private _width : number;
	private _height : number;
	private _url : string;
	private _angle : number;
	private _cx : number;
	private _cy : number;

	private _translateMessage : string;
	private _rotateMessage : string;

	constructor (obj ?: IThing) {
		this._coord = new Point();
		if (obj) {
			this.width = obj.width;
			this.height = obj.height;
			this.x = obj.x || 0;
			this.y = obj.y || 0;
			this.id = obj.id;
			this.url = obj.url;
			this.angle = obj.angle;
		} else {
			throw new Error('Isn\'t element!');
		}
	}

	set x (data : number) {
		this._coord.x = data;
		this.recreateTranslate();
	}
	get x () : number {
		return this._coord.x;
	}
	set y (data : number) {
		this._coord.y = data;
		this.recreateTranslate();
	}
	get y () : number {
		return this._coord.y;
	}
	set width (data : number) {
		this._width = HelperClass.prepareData(data, 0);
		this._cx = this._width / 2;
		this.recreateRotate();
	}
	get width () : number {
		return this._width;
	}
	set height (data : number) {
		this._height = HelperClass.prepareData(data, 0);
		this._cy = this._height / 2;
		this.recreateRotate();
	}
	get height () : number {
		return this._height;
	}
	set angle (data : number) {
		this._angle = HelperClass.prepareData(data, 0, 360);
		this.recreateRotate();
	}
	get angle () : number {
		return this._angle;
	}
	set id (data : number) {
		this._id = HelperClass.prepareData(data, 0);
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

	/**
	 * recreateTranslate - выполняет обновление строки с информацией о повороте.
	 *
	 * @method
	 *
	 * @return {string}
	 */
	private recreateTranslate () : string {
		this._translateMessage = `${this._coord.transform()}`;
		return this._translateMessage;
	}

	/**
	 * recreateTranslate - выполняет обновление строки с информацией о повороте.
	 *
	 * @method
	 *
	 * @return {string}
	 */
	private recreateRotate () : string {
		this._rotateMessage = `rotate(${this.angle},${this._cx},${this._cy})`;
		return this._rotateMessage;
	}

	/**
	 * valueOf - возвращает объектное представление класса.
	 *
	 * @method
	 *
	 * @return {IThing}
	 */
	valueOf () : IThing {
		return {
			id : this.id,
			x : this.x,
			y : this.y,
			width : this.width,
			height : this.height,
			angle : this.angle,
			url : this.url
		};
	}

	/**
	 * transform - возвращает строку для атрибута transform
	 *
	 * @method
	 *
	 * @return {String}  description
	 */
	transform () {
		return `${this._translateMessage} ${this._rotateMessage}`;
	}
}
