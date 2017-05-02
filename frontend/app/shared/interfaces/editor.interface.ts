import { ISurface } from '../lib/surface.class';
import { IThing } from '../lib/thing.class';

export interface IWorkstate {
	type : string;
	model : any;
}

export interface IElement {
	type : string;
	id : number;
}

export interface ITexture {
	_id : string;
	_cid : string;
	url : string;
	width : number;
	height : number;
}
export interface ITextureCategory {
	_id : string;
	name : string;
}

export interface IItem {
	_id : string;
	_cid : string;
	type : string;
	payload : ISurface | IThing;
}
export interface IItemCategory {
	_id : string;
	_pid : string;
	name : string;
}
