import { Reducer } from 'redux';
import { IAction } from '../shared/interfaces/action.interface';
import { EditorActions } from '../actions/editor.actions';

export interface IEditor {
	selectElement : boolean
}

export const INITIAL_STATE : IEditor = {
	selectElement : false
};

export const EditorReducer : Reducer<IEditor> = (state = INITIAL_STATE, action : IAction) : IEditor => {
	switch (action.type) {
		case EditorActions.SELECT_ELEMENT : {
			return Object.assign({}, state, { selectElement : action.payload.state });
		}
	}
	return state
}
