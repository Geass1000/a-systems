import { Reducer } from 'redux';
import { EditorActions } from '../../actions/editor.actions';
import { IAction } from '../../shared/interfaces/action.interface';

import { Workspace } from '../../shared/lib/workspace.class';

export interface IEditorProject {
	name : string;
	workspace : Workspace;
}

export const INITIAL_STATE : IEditorProject = {
	name : '',
	workspace : null
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
	}
	return state;
};
