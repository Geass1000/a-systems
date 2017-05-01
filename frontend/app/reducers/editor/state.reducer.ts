import { Reducer } from 'redux';
import { EditorActions } from '../../actions/editor.actions';
import { IAction } from '../../shared/interfaces/action.interface';

import { IWorkstate, IElement } from '../../shared/interfaces/editor.interface';

export interface IEditorState {
	// Init Editor
	isInitProject : boolean;
	isInitWorkspace : boolean;
	// Metrc Service
	isActiveMetric : boolean;
	curMeasure : string;
	// Workspace
	workstate : IWorkstate;
	// DragAndDrop
	isMove : boolean;
	element : IElement;
	activeElements : Array<IElement>;
}

export const INITIAL_STATE : IEditorState = {
	// Init Editor
	isInitProject : false,
	isInitWorkspace : false,
	// Metrc Service
	isActiveMetric : false,
	curMeasure : 'm',
	// Workspace
	workstate : null,
	// DragAndDrop
	isMove : false,
	element : null,
	activeElements : []
};

export const EditorStateReducer : Reducer<IEditorState> =
	(state : IEditorState = INITIAL_STATE, action : IAction) : IEditorState => {
	switch (action.type) {
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
		case EditorActions.TOGGLE_MOVE : {
			return Object.assign({}, state, { isMove : action.payload.state });
		}
		case EditorActions.SET_ACTIVE_ELEMENTS : {
			let activeElements = [...action.payload.elements];
			return Object.assign({}, state, { activeElements : activeElements });
		}
	}
	return state;
};
