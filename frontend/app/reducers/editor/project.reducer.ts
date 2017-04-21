import { Reducer } from 'redux';
import { EditorActions } from '../../actions/editor.actions';
import { IAction } from '../../shared/interfaces/action.interface';

export interface IEditorProject {
	name : string;
}

export const INITIAL_STATE : IEditorProject = {
	name : ''
};

export const EditorProjectReducer : Reducer<IEditorProject> =
	(state : IEditorProject = INITIAL_STATE, action : IAction) : IEditorProject => {
	switch (action.type) {
		case EditorActions.ACTIVE_METRIC : {
			return state;
		}
	}
	return state;
};
