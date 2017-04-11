export interface IWorkspace {
	height : number,
	width : number,
	texture : string
}

export interface ITexture {
	_id : string,
	type : string,
	url : string,
	width : number,
	height : number
}

export interface ITextureType {
	_id : string,
	name : string
}
