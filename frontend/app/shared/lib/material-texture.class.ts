
export interface IMaterialTexture {
	url : string;
	defWidth : number;
	defHeight : number;
	scale : number;
	angle : number;
}

export class MaterialTexture {
	private _defWidth : number;		// Ширина текстуры по умолчанию
	private _defHeight : number;	// Высота текстуры по умолчанию
	private _scale : number;			// Масштаб текстуры
	private _width : number;			// Вычисленная ширина текстуры, по формуле: defWidth * scale
	private _height : number;			// Вычисленная высота текстуры, по формуле: defHeight * scale
	private _angle : number;			// Угол поворота текстуры
	private _url : string;				// url текстуры

	constructor (obj : IMaterialTexture) {
		if (!obj) {
			throw new Error('MaterialTexture - constructor: All params is required!');
		}

		this.url = obj.url;
		this.defWidth = obj.defWidth;
		this.defHeight = obj.defHeight;
		this.scale = obj.scale;
		this.angle = obj.angle;
	}

	set angle (data : number) {
		this._angle = this.prepareNumberData(data);
	}
	get angle () : number {
		return this._angle;
	}

	set defWidth (data : number) {
		this._defWidth = this.prepareNumberData(data);
		this.width = this.scale ? this.defWidth * this.scale : this.width;
	}
	get defWidth () : number {
		return this._defWidth;
	}
	set defHeight (data : number) {
		this._defHeight = this.prepareNumberData(data);
		this.height = this.scale ? this.defHeight * this.scale : this.height;
	}
	get defHeight () : number {
		return this._defHeight;
	}

	set width (data : number) { ;	}
	get width () : number {
		return this._width;
	}
	set height (data : number) { ;	}
	get height () : number {
		return this._height;
	}

	set scale (data : number) {
		this._scale = this.prepareNumberData(data);
		this._width = Math.round(this.defWidth * this.scale);
		this._height = Math.round(this.defHeight * this.scale);
	}
	get scale () : number {
		return this._scale;
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
}
