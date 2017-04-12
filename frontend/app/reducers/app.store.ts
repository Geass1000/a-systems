import { combineReducers } from 'redux';

/* Store Interfaces */
import { IModal } from './modal.reducer';
import { IEditorAll } from './editor/all.reducer';
import { IEditorTexture } from './editor/texture.reducer';

/* Reducers */
import { ModalReducer } from './modal.reducer';
import { EditorAllReducer } from './editor/all.reducer';
import { EditorTextureReducer } from './editor/texture.reducer';

/* Store Initial States */
import { INITIAL_STATE as MODAL_INITIAL_STATE } from './modal.reducer';
import { INITIAL_STATE as EDITOR_ALL_INITIAL_STATE } from './editor/all.reducer';
import { INITIAL_STATE as EDITOR_TEXTURE_INITIAL_STATE } from './editor/texture.reducer';

interface IEditor {
	all : IEditorAll,
	texture : IEditorTexture
}

/* Store Interface */
export interface IAppState {
	modal : IModal,
	editor : IEditor
}

/* Store Initial State */
export const INITIAL_STATE : IAppState = {
	modal : MODAL_INITIAL_STATE,
	editor : {
		all : EDITOR_ALL_INITIAL_STATE,
		texture : EDITOR_TEXTURE_INITIAL_STATE
	}
}

/* Combine All Reducers */
export const AppReducer = combineReducers<IAppState>({
	modal : ModalReducer,
	editor : combineReducers<IEditor>({
		all : EditorAllReducer,
		texture : EditorTextureReducer
	})
});
