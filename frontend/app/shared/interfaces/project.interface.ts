import { IWorkspace } from '../lib/workspace.class';
import { ISurface } from '../lib/surface.class';
import { IThing } from '../lib/thing.class';

export interface IProject {
	_id : string;
	_uid : string;
	name : string;
	workspace : IWorkspace;
	surfaces : Array<ISurface>;
	things : Array<IThing>;
}
export interface IRProject {
	project : IProject;
}

export interface IProjects {
	_id : string;
	name : string;
}
export interface IRProjects {
	projects : Array<IProjects>;
}

export interface IProjectsSave {
	_id : string;
	_uid : string;
}
export interface IRProjectsSave {
	project : IProjectsSave;
}
