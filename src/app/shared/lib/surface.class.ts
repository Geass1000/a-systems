import { HelperClass } from './helper.class';

import { Point, IPoint } from './point.class';
import { IMaterial, Material } from './material.class';

export interface ISurface {
	id ?: number;
	x ?: number;
	y ?: number;
	stroke : IMaterial;
	fill : IMaterial;
	points : Array<IPoint>;
}

export class Surface implements ISurface {
	private _id : number;
	private _coord : Point;						// Координаты смещения относительно верхнего левого угла
	private _stroke : Material;				// Текстура границы поверхности
	private _fill : Material;					// Текстура поверхности
	private _points : Array<Point>;		// Массив точек, определяющие границы поверхности

	constructor (obj ?: ISurface) {
		this._coord = new Point();
		if (obj) {
			this.x = obj.x;
			this.y = obj.y;
			this.stroke = new Material(obj.stroke);
			this.fill = new Material(obj.fill);
			this._points = obj.points.map((data : IPoint) => { return new Point(data); });
			this.id = obj.id;
		} else {
			this.x = 0;
			this.y = 0;
			this.stroke = new Material();
			this.fill = new Material();
			this.points = [];
			this.id = null;
		}
	}

	set x (data : number) {
		this._coord.x = HelperClass.prepareData(data);
	}
	get x () : number {
		return this._coord.x;
	}
	set y (data : number) {
		this._coord.y = HelperClass.prepareData(data);
	}
	get y () : number {
		return this._coord.y;
	}
	set stroke (data : Material) {
		this._stroke = data;
	}
	get stroke () : Material {
		return this._stroke;
	}
	set fill (data : Material) {
		this._fill = data;
	}
	get fill () : Material {
		return this._fill;
	}
	set points (data : Array<Point>) {
		this._points = data;
	}
	get points () : Array<Point> {
		return this._points;
	}
	set id (data : number) {
		this._id = HelperClass.prepareData(data, 0);
	}
	get id () : number {
		return this._id;
	}

	/**
	 * valueOf - возвращает объектное представление класса.
	 *
	 * @function
	 * @method
	 *
	 * @return {ISurface}
	 */
	valueOf () : ISurface {
		return {
			id : this.id,
			x : this.x,
			y : this.y,
			stroke : this.stroke.valueOf(),
			fill : this.fill.valueOf(),
			points : this.points.map((data) => data.valueOf())
		};
	}

	/**
	 * shoelaceFormula - вычисляет площадь поверхности.
	 *
	 * @class Surface
	 * @method
	 *
	 * @return {Number} - площадь поверхности
	 */
	shoelaceFormula () {
		let result : number = 0;
		const len : number = this.points.length;
		if (len <= 2) {
			return result;
		}
		const yMax : number = this.points[len - 1].y;
		const yMin : number = this.points[0].y;
		this.points.map((data, index, arr) => {
			const yD : number = index === 0 ? yMax : arr[index - 1].y;
			const yS : number = index === len - 1 ? yMin : arr[index + 1].y;
			result += arr[index].x * (yS - yD);
		});

		return result * 0.5;
	}

	/**
	 * poliPoints - возвращает строку с координатами для аттрибута points из
	 * полученных из массива точек surface.points.
	 *
	 * @class Surface
	 * @method
	 *
	 * @return {String}  description
	 */
	poliPoints () {
		return this.points.join(' ');
	}

	/**
	 * transform - возвращает строку для атрибута transform
	 *
	 * @class Surface
	 * @method
	 *
	 * @return {String}  description
	 */
	transform () {
		return this._coord.transform();
	}
}
