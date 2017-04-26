export interface IWorkspace {
	height : number | string;
	width : number | string;
	texture : string;
}

export interface IWorkspaceCoord {
	x : number;
	y : number;
}

export interface IWorkstate {
	type : string;
	model : any;
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
