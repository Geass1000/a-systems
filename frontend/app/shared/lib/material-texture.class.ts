
export interface IMaterialTexture {
	url : string;
	width : number;
	height : number;
	scale : number;
	angle : number;
}

export class MaterialTexture {
	private defWidth : number;
	private defHeight : number;
	private _width : number;
	private _height : number;

	private _angle : number;
	private _scale : number;

	private _url : string;

	constructor (obj : IMaterialTexture) {
		if (!obj) {
			throw new Error('MaterialTexture - constructor: All params is required!');
		}

		this.url = obj.url;
		this.defWidth = obj.width;
		this.defHeight = obj.height;
		this.width = this.defWidth;
		this.height = this.defHeight;
		this.scale = obj.scale;
		this.angle = obj.angle;
	}

	set angle (data : number) {
		this._angle = this.prepareNumberData(data);
	}
	get angle () : number {
		return this._angle;
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
	set scale (data : number) {
		this._scale = this.prepareNumberData(data);
		this.width = Math.round(this.defWidth * this.scale);
		this.height = Math.round(this.defHeight * this.scale);
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
