import { Reducer } from 'redux';
import { EditorActions } from '../../actions/editor.actions';
import { IAction } from '../../shared/interfaces/action.interface';

import { Config } from '../../config';
import * as _ from 'lodash';

import { IWorkspace } from '../../shared/interfaces/editor.interface';

export interface IEditorAll {
	isInitWorkspace : boolean,
	// Control Panel
	defMeasure : string,
	curMeasure : string,
	// Workspace
	selectElement : boolean,
	workspace : IWorkspace,
}

export const INITIAL_STATE : IEditorAll = {
	isInitWorkspace : false,
	// Control Panel
	defMeasure : 'px',
	curMeasure : 'm',
	// Workspace
	selectElement : false,
	workspace : _.cloneDeep(Config.workspace),
};

export const EditorAllReducer : Reducer<IEditorAll> = (state : IEditorAll = INITIAL_STATE, action : IAction) : IEditorAll => {
	switch (action.type) {
		case EditorActions.SELECT_ELEMENT : {
			return Object.assign({}, state, { selectElement : action.payload.state });
		}
		case EditorActions.INIT_WORKSPACE : {
			return Object.assign({}, state, { isInitWorkspace : action.payload.state });
		}
		case EditorActions.UPDATE_WORKSPACE : {
			let workspace : IWorkspace = _.cloneDeep(action.payload.workspace);
			return Object.assign({}, state, { workspace : workspace });
		}
		case EditorActions.SET_MEASURE : {
			return Object.assign({}, state, { curMeasure : action.payload.measure });
		}
	}
	return state
}
