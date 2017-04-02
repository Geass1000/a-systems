export interface IWorkspace {
	height : number,
	width : number,
	texture : ITextureTile
}

export interface ITexture {
	_id : string,
	type : string,
	url : string,
	size : number,
	names : Array<string>
}

export interface ITextureTile {
	_id_texture : string | number,
	_id_tile : string | number
}
