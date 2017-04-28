import { Reducer } from 'redux';
import { EditorActions } from '../../actions/editor.actions';
import { IAction } from '../../shared/interfaces/action.interface';

import { Workspace } from '../../shared/lib/workspace.class';
import { Surface } from '../../shared/lib/surface.class';

export interface IEditorProject {
	name : string;
	workspace : Workspace;
	surfaces : Array<Surface>;
}

export const INITIAL_STATE : IEditorProject = {
	name : '',
	workspace : null,
	surfaces : []
};

export const EditorProjectReducer : Reducer<IEditorProject> =
	(state : IEditorProject = INITIAL_STATE, action : IAction) : IEditorProject => {
	switch (action.type) {
		case EditorActions.UPDATE_WORKSPACE : {
			let workspace : Workspace = new Workspace(action.payload.workspace);
			return Object.assign({}, state, { workspace : workspace });
		}
		case EditorActions.UPDATE_PROJECT_NAME : {
			let name : string = action.payload.name;
			return Object.assign({}, state, { name : name });
		}
		case EditorActions.ADD_SURFACE : {
			let surface : Surface = new Surface(action.payload.surface);
			let index = 0;
			state.surfaces.map((data : Surface) => {
				if (data.id >= index) {
					index = data.id + 1;
				}
			});
			surface.id = index;
			return Object.assign({}, state, {
				surfaces : [...state.surfaces, surface]
			});
		}
		case EditorActions.TRANSLATE_SURFACE : {
			let surfaces = [...state.surfaces];
			surfaces[action.payload.id].x += action.payload.dX;
			surfaces[action.payload.id].y += action.payload.dY;
			return Object.assign({}, state, {
				surfaces : surfaces
			});
		}
	}
	return state;
};
