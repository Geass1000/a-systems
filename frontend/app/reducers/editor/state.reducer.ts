import { Reducer } from 'redux';
import { EditorActions } from '../../actions/editor.actions';
import { IAction } from '../../shared/interfaces/action.interface';

import { IWorkstate, IElement } from '../../shared/interfaces/editor.interface';
import { Point } from '../../shared/lib/point.class';

export interface IEditorState {
	isInitProject : boolean;
	isInitWorkspace : boolean;
	isActiveMetric : boolean;
	// Control Panel
	defMeasure : string;
	curMeasure : string;
	// Workspace
	workstate : IWorkstate;
	// Camera
	isMove : boolean;
	workspaceCoord : Point;
	element : IElement;
}

export const INITIAL_STATE : IEditorState = {
	isInitProject : false,
	isInitWorkspace : false,
	isActiveMetric : false,
	// Control Panel
	defMeasure : 'px',
	curMeasure : 'm',
	// Workspace
	workstate : null,
	// Camera
	isMove : false,
	workspaceCoord : new Point(),
	element : null
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
		case EditorActions.TRANSLATE_WORKSPACE : {
			/*
			let workspaceCoord : Point = new Point({
				x : state.workspaceCoord.x + action.payload.dX,
				y : state.workspaceCoord.y + action.payload.dY,
			});
			return Object.assign({}, state, {
				workspaceCoord : workspaceCoord
			});
			*/
			state.workspaceCoord.x += action.payload.dX;
			state.workspaceCoord.y += action.payload.dY;
			return state;
		}
		case EditorActions.SET_ELEMENT : {
			let element = Object.assign({}, action.payload.element);
			return Object.assign({}, state, { element : element });
		}
	}
	return state;
};
