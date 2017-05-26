
export interface IMaterialTexture {
	iid : string;
	url : string;
	width : number;
	height : number;
	scale : number;
	angle : number;
}

export class MaterialTexture implements IMaterialTexture {
	private _defWidth : number;		// Ширина текстуры по умолчанию
	private _defHeight : number;	// Высота текстуры по умолчанию
	private _scale : number;			// Масштаб текстуры
	private _width : number;			// Вычисленная ширина текстуры, по формуле: defWidth * scale
	private _height : number;			// Вычисленная высота текстуры, по формуле: defHeight * scale
	private _angle : number;			// Угол поворота текстуры
	private _url : string;				// url текстуры

	private _id : string;

	constructor (texture ?: IMaterialTexture) {
		if (texture) {
			this.iid = texture.iid;
			this.url = texture.url;
			this.defWidth = texture.width;
			this.defHeight = texture.height;
			this.scale = texture.scale;
			this.angle = texture.angle;
		} else {
			this.iid = '';
			this.url = '';
			this.defWidth = 0;
			this.defHeight = 0;
			this.scale = 1;
			this.angle = 0;
		}
	}

	set iid (data : string) {
		this._id = data;
	}
	get iid () : string {
		return this._id;
	}

	set angle (data : number) {
		this._angle = this.prepareNumberData(data);
	}
	get angle () : number {
		return this._angle;
	}

	set defWidth (data : number) {
		this._defWidth = this.prepareNumberData(data);
		this._width = this.scale ? this.defWidth * this.scale : this.defWidth * 1;
	}
	get defWidth () : number {
		return this._defWidth;
	}
	set defHeight (data : number) {
		this._defHeight = this.prepareNumberData(data);
		this._height = this.scale ? this.defHeight * this.scale : this.defHeight * 1;
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
		this._width = +(this.defWidth * this.scale).toFixed(10);
		this._height = +(this.defHeight * this.scale).toFixed(10);
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

	/**
	 * valueOf - возвращает объектное представление класса.
	 *
	 * @function
	 * @method
	 *
	 * @return {IMaterialTexture}
	 */
	valueOf () : IMaterialTexture {
		return {
			iid : this.iid,
			url : this.url,
			width : this.defWidth,
			height : this.defHeight,
			scale : this.scale,
			angle : this.angle
		};
	}

	/**
	 * toString - функция, возвращающая строковое представление класса.
	 *
	 * @function
	 * @return {string}
	 */
	toString () : string {
		if (this.url) {
			return `url('/assets/textures/${this.url}')`;
		} else {
			return '#fff';
		}
	}

	/**
	 * getSrc - функция, возвращающая url адрес текстуры.
	 *
	 * @function
	 * @return {string}
	 */
	getSrc () : string {
		if (this.url) {
			return `${location.protocol}//${location.host}/assets/textures/${this.url}`;
		} else {
			return '';
		}
	}
}