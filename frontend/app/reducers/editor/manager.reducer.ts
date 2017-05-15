import { Reducer } from 'redux';
import { EditorActions } from '../../actions/editor.actions';
import { IAction } from '../../shared/interfaces/action.interface';

export interface IEditorManager {
	open : boolean;
	active : string;
	workshop : boolean;
	workstate : boolean;
	material : boolean;
	dispatcher : boolean;
}

export const INITIAL_STATE : IEditorManager = {
	open : true,
	active : 'workstate',
	workshop : false,
	workstate : true,
	material : false,
	dispatcher : false
};

export const EditorManagerReducer : Reducer<IEditorManager> =
	(state : IEditorManager = INITIAL_STATE, action : IAction) : IEditorManager => {
	switch (action.type) {
		case EditorActions.OPEN_MANAGER_PANEL : {
			let panel = Object.assign({}, state, {
				open : true
			});
			if (panel.active !== null) {
				panel[panel.active] = false;
			}
			if (panel.active !== action.payload.name) {
				panel[action.payload.name] = true;
				panel.active = action.payload.name;
			} else {
				panel.active = null;
				panel.open = false;
			}
			return panel;
		}
		case EditorActions.CLOSE_ACTIVE_MANAGER_PANEL : {
			let panel = Object.assign({}, state, {
				open : false
			});
			if (panel.active !== null) {
				panel[panel.active] = false;
				panel.active = null;
			}
			return panel;
		}
	}
	return state;
};
