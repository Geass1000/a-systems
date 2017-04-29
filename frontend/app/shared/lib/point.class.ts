export interface IPoint {
	x : number;
	y : number;
}

export class Point implements IPoint {
	private _x : number;
	private _y : number;

	constructor (obj ?: IPoint) {
		if (obj) {
			this.x = obj.x;
			this.y = obj.y;
		} else {
			this.x = 0;
			this.y = 0;
		}
	}

	set x (data : number) {
		this._x = this.prepareNumberData(data);
	}
	get x () : number {
		return this._x;
	}
	set y (data : number) {
		this._y = this.prepareNumberData(data);
	}
	get y () : number {
		return this._y;
	}
	prepareNumberData (data : number) : number {
		return isFinite(data) ? data : 0;
	}

	toString () : string {
		return `${this.x},${this.y}`;
	}
	valueOf () : IPoint {
		return {
			x : this.x,
			y : this.y
		};
	}

	/**
	 * transform - возвращает строку для атрибута transform
	 *
	 * @class Point
	 * @return {String}  description
	 */
	transform () {
		return `translate(${this.x}, ${this.y})`;
	}
}
