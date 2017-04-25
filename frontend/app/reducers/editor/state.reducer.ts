import { Reducer } from 'redux';
import { EditorActions } from '../../actions/editor.actions';
import { IAction } from '../../shared/interfaces/action.interface';

export interface IEditorState {
	isInitProject : boolean;
	isInitWorkspace : boolean;
	isActiveMetric : boolean;
	// Control Panel
	defMeasure : string;
	curMeasure : string;
	// Workspace
	selectElement : boolean;
}

export const INITIAL_STATE : IEditorState = {
	isInitProject : false,
	isInitWorkspace : false,
	isActiveMetric : false,
	// Control Panel
	defMeasure : 'px',
	curMeasure : 'm',
	// Workspace
	selectElement : false
};

export const EditorStateReducer : Reducer<IEditorState> =
	(state : IEditorState = INITIAL_STATE, action : IAction) : IEditorState => {
	switch (action.type) {
		case EditorActions.SELECT_ELEMENT : {
			return Object.assign({}, state, { selectElement : action.payload.state });
		}
		case EditorActions.INIT_WORKSPACE : {
			return Object.assign({}, state, { isInitWorkspace : action.payload.state });
		}
		case EditorActions.INIT_PROJECT : {
			return Object.assign({}, state, { isInitProject : action.payload.state });
		}
		case EditorActions.ACTIVE_METRIC : {
			return Object.assign({}, state, { isActiveMetric : action.payload.state });
		}
		case EditorActions.SET_MEASURE : {
			return Object.assign({}, state, { curMeasure : action.payload.measure });
		}
	}
	return state;
};
