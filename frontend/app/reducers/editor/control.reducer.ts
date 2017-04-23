import { Reducer } from 'redux';
import { EditorActions } from '../../actions/editor.actions';
import { IAction } from '../../shared/interfaces/action.interface';

export interface IEditorControl {
	open : boolean;
	active : string;
	initProject : boolean;
}

export const INITIAL_STATE : IEditorControl = {
	open : true,
	active : 'initProject',
	initProject : true
};

export const EditorControlReducer : Reducer<IEditorControl> =
	(state : IEditorControl = INITIAL_STATE, action : IAction) : IEditorControl => {
	switch (action.type) {
		case EditorActions.OPEN_CONTROL_MODAL : {
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
		case EditorActions.CLOSE_ACTIVE_CONTROL_MODAL : {
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
