import { IWorkspace } from '../interfaces/editor.interface';

export class Workspace {
	private _width : number | string;
	private _height : number | string;
	private _texture : string;

	constructor (obj ?: IWorkspace | Workspace) {
		if (obj) {
			this.width = obj.width;
			this.height = obj.height;
			this.texture = obj.texture;
		}
	}

	set width (data : number | string) {
		let dataNum : number = +data;
		if (isFinite(dataNum)) {
			this._width = dataNum;
		} else {
			this._width = data;
		}
	}
	get width () : number | string {
		return this._width;
	}

	set height (data : number | string) {
		let dataNum : number = +data;
		if (isFinite(dataNum)) {
			this._height = dataNum;
		} else {
			this._height = data;
		}
	}
	get height () : number | string {
		return this._height;
	}

	set texture (data : string) {
		this._texture = data;
	}
	get texture () : string {
		return this._texture;
	}

	valueOf () : IWorkspace {
		return {
			width : this.width,
			height : this.height,
			texture : this.texture
		};
	}
}
