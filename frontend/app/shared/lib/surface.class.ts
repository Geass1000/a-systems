import { Point, IPoint } from './point.class';

export interface ISurface {
	x : number;
	y : number;
	tStroke : string;
	tFill : string;
	points : Array<IPoint>;
}

export class Surface implements ISurface {
	private _x : number;
	private _y : number;
	private _tStroke : string;
	private _tFill : string;
	private _points : Array<Point>;

	constructor (obj ?: ISurface) {
		if (obj) {
			this.x = obj.x;
			this.y = obj.y;
			this._points = obj.points.map((data : IPoint) => { return new Point(data); });
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
	set tStroke (data : string) {
		this._tStroke = data.toString();
	}
	get tStroke () : string {
		return this._tStroke;
	}
	set tFill (data : string) {
		this._tFill = data.toString();
	}
	get tFill () : string {
		return this._tFill;
	}
	set points (data : Array<Point>) {
		this._points = data;
	}
	get points () : Array<Point> {
		return this._points;
	}

	prepareNumberData (data : number) : number {
		return isFinite(data) ? data : 0;
	}
}
