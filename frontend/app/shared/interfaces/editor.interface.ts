export interface IWorkspace {
	height : number;
	width : number;
	texture : string;
}

export interface ICoord {
	x : number;
	y : number;
}

export interface IWorkstate {
	type : string;
	model : any;
}

export interface IElement {
	type : string;
	id : number;
	pid ?: number;										// Point id
}

export interface ITexture {
	_id : string;
	type : string;
	url : string;
	width : number;
	height : number;
}

export interface ITextureType {
	_id : string;
	name : string;
}

export interface IItemCategory {
	_id : string;
	_pid : string;
	name : string;
}
