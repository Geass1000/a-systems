import { combineReducers } from 'redux';

/* Store Interfaces */
import { IModal } from './modal.reducer';
import { IEditor } from './editor.reducer';

/* Reducers */
import { ModalReducer } from './modal.reducer';
import { EditorReducer } from './editor.reducer';

/* Store Initial States */
import { INITIAL_STATE as MODAL_INITIAL_STATE } from './modal.reducer';
import { INITIAL_STATE as EDITOR_INITIAL_STATE } from './editor.reducer';

/* Store Interface */
export interface IAppState {
	modal : IModal,
	editor : IEditor
}

/* Store Initial State */
export const INITIAL_STATE : IAppState = {
	modal : MODAL_INITIAL_STATE,
	editor : EDITOR_INITIAL_STATE
}

/* Combine All Reducers */
export const AppReducer = combineReducers<IAppState>({
	modal : ModalReducer,
	editor : EditorReducer
});
