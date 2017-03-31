export interface IWorkspace {
	height : number,
	width : number
}

export interface ITexture {
	_id : string,
	type : string,
	url : string,
	size : number,
	names : Array<string>
}
