export interface IModelInitProject {
	name : string;
	width : string;
	height : string;
};
export interface IModelTexture {
	id : string;
	size : string;
	angle : string;
}
export interface IModelWorkspace {
	width : string;
	height : string;
	texture ?: string;
}
