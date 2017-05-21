import { Reducer } from 'redux';
import { EditorActions } from '../../actions/editor.actions';
import { IAction } from '../../shared/interfaces/action.interface';

import * as _ from 'lodash';

import { Workspace } from '../../shared/lib/workspace.class';
import { ISurface, Surface } from '../../shared/lib/surface.class';
import { IThing, Thing } from '../../shared/lib/thing.class';

export interface IEditorProject {
	_id : string;
	_uid : string;
	name : string;
	workspace : Workspace;
	surfaces : Array<Surface>;
	things : Array<Thing>;
}

export const INITIAL_STATE : IEditorProject = {
	_id : null,
	_uid : null,
	name : '',
	workspace : null,
	surfaces : [],
	things : []
};

export const EditorProjectReducer : Reducer<IEditorProject> =
	(state : IEditorProject = _.cloneDeep(INITIAL_STATE), action : IAction) : IEditorProject => {
	switch (action.type) {
		case EditorActions.SET_WORKSPACE : {
			let workspace : Workspace = new Workspace(action.payload.workspace);
			return Object.assign({}, state, { workspace : workspace });
		}
		case EditorActions.UPDATE_PROJECT_NAME : {
			let name : string = action.payload.name;
			return Object.assign({}, state, { name : name });
		}
		case EditorActions.DELETE_ELEMENT : {
			if (!action.payload.elems || !action.payload.elems.length) {
				return state;
			}
			let newState : IEditorProject = Object.assign({}, state);
			let el : any = newState;
			let elName : string;

			let len : number = action.payload.elems.length - 1;
			for (let i = 0; i < len; i++) {
				elName = action.payload.elems[i].type + 's';
				el = el[elName][action.payload.elems[i].id];
			}

			elName = action.payload.elems[len].type + 's';
			el[elName] = el[elName].slice();
			el[elName].splice(action.payload.elems[len].id, 1);
			return newState;
		}
		case EditorActions.UPDATE_SURFACE : {
			let surface : Surface = new Surface(action.payload.surface);
			let surfaces : Array<Surface> = state.surfaces.slice();
			surfaces[action.payload.id] = surface;
			return Object.assign({}, state, {
				surfaces : surfaces
			});
		}
		case EditorActions.UPDATE_THING : {
			let newState : IEditorProject = Object.assign({}, state);
			let thing : Thing = new Thing(action.payload.thing);

			newState.things[action.payload.id] = thing;
			return newState;
		}
		case EditorActions.ADD_SURFACE : {
			let surface : Surface = new Surface(action.payload.surface);
			surface.id = getMaxId(state.surfaces);
			return Object.assign({}, state, {
				surfaces : [...state.surfaces, surface]
			});
		}
		case EditorActions.ADD_THING : {
			let thing : Thing = new Thing(action.payload.thing);
			thing.id = getMaxId(state.things);
			return Object.assign({}, state, {
				things : [...state.things, thing]
			});
		}
		case EditorActions.TRANSLATE_WORKSPACE : {
			/*
			let workspace : Workspace = new Workspace(state.workspace);
			workspace.x += action.payload.dX;
			workspace.y += action.payload.dY;
			return Object.assign({}, state, {
				workspace : workspace
			});
			*/
			state.workspace.x += action.payload.dX;
			state.workspace.y += action.payload.dY;
			return state;
		}
		case EditorActions.TRANSLATE_SURFACE : {
			let surfaces = state.surfaces.slice();
			surfaces[action.payload.id].x += action.payload.dX;
			surfaces[action.payload.id].y += action.payload.dY;
			return Object.assign({}, state, {
				surfaces : surfaces
			});
			/*
			state.surfaces[action.payload.id].x += action.payload.dX;
			state.surfaces[action.payload.id].y += action.payload.dY;
			return state;
			*/
		}
		case EditorActions.TRANSLATE_SURFACE_POINT : {
			let surfaces = state.surfaces.slice();
			surfaces[action.payload.id].points[action.payload.pid].x += action.payload.dX;
			surfaces[action.payload.id].points[action.payload.pid].y += action.payload.dY;
			return Object.assign({}, state, {
				surfaces : surfaces
			});
			/*
			state.surfaces[action.payload.id].points[action.payload.pid].x += action.payload.dX;
			state.surfaces[action.payload.id].points[action.payload.pid].y += action.payload.dY;
			return state;
			*/
		}
		case EditorActions.TRANSLATE_THING : {
			let things = state.things.slice();
			things[action.payload.id].x += action.payload.dX;
			things[action.payload.id].y += action.payload.dY;
			return Object.assign({}, state, {
				things : things
			});
			/*
			state.things[action.payload.id].x += action.payload.dX;
			state.things[action.payload.id].y += action.payload.dY;
			return state;
			*/
		}
		case EditorActions.SET_PROJECT : {
			let project = action.payload.project;
			let newState = _.cloneDeep(INITIAL_STATE);
			newState._id = project._id;
			newState._uid = project._uid;
			newState.name = project.name;
			newState.workspace = new Workspace(project.workspace);

			project.surfaces.map((data : ISurface) => {
				newState.surfaces.push(new Surface(data));
			});
			project.things.map((data : IThing) => {
				newState.things.push(new Thing(data));
			});
			return newState;
		}
		case EditorActions.SAVE_PROJECT : {
			return Object.assign({}, state, {
				_id : action.payload.project._id,
				_uid : action.payload.project._uid
			});
		}
		case EditorActions.RESET_PROJECT : {
			return _.cloneDeep(INITIAL_STATE);
		}
	}
	return state;
};

function getMaxId (arr : Array<Surface|Thing>) : number {
	return arr.reduce((prev, cur) => {
		return prev > cur.id ? prev : cur.id + 1;
	}, 0);
}
