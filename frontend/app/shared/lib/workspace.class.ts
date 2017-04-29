import { Config } from '../../config';

export interface IWorkspace {
	height : number;
	width : number;
	texture : string;
	x ?: number;
	y ?: number;
}

export class Workspace implements IWorkspace {
	private _width : number;
	private _height : number;
	private _texture : string;
	private _x : number;
	private _y : number;

	constructor (obj ?: IWorkspace) {
		if (obj) {
			this.width = obj.width;
			this.height = obj.height;
			this.texture = obj.texture;
			this.x = obj.x || 0;
			this.y = obj.y || 0;
		} else {
			this.width = Config.workspace.width;
			this.height = Config.workspace.height;
			this.texture = Config.workspace.texture;
			this.x = 0;
			this.y = 0;
		}
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
	set texture (data : string) {
		this._texture = data;
	}
	get texture () : string {
		return this._texture;
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
	valueOf () : IWorkspace {
		return {
			width : this.width,
			height : this.height,
			texture : this.texture
		};
	}
	transform () {
		return `translate(${this.x}, ${this.y})`;
	}
}
