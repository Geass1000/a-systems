import { Config } from '../../config';

import { IWorkspace } from '../interfaces/editor.interface';

export class Workspace {
	private _width : number;
	private _height : number;
	private _texture : string;

	constructor (obj ?: IWorkspace | Workspace) {
		if (obj) {
			this.width = obj.width;
			this.height = obj.height;
			this.texture = obj.texture;
		} else {
			this.width = Config.workspace.width;
			this.height = Config.workspace.height;
			this.texture = Config.workspace.texture;
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

	valueOf () : IWorkspace {
		return {
			width : this.width,
			height : this.height,
			texture : this.texture
		};
	}

	prepareNumberData (data : number) : number {
		return isFinite(data) ? data : 0;
	}
}
