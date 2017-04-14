import { combineReducers } from 'redux';

/* Store Interfaces */
import { IModal } from './modal.reducer';
import { IEditorAll } from './editor/all.reducer';
import { IEditorTexture } from './editor/texture.reducer';
import { IEditorManager } from './editor/manager.reducer';

/* Reducers */
import { ModalReducer } from './modal.reducer';
import { EditorAllReducer } from './editor/all.reducer';
import { EditorTextureReducer } from './editor/texture.reducer';
import { EditorManagerReducer } from './editor/manager.reducer';

/* Store Initial States */
import { INITIAL_STATE as INITIAL_STATE_MODAL } from './modal.reducer';
import { INITIAL_STATE as INITIAL_STATE_EDITOR_ALL } from './editor/all.reducer';
import { INITIAL_STATE as INITIAL_STATE_EDITOR_TEXTURE } from './editor/texture.reducer';
import { INITIAL_STATE as INITIAL_STATE_EDITOR_MANAGER } from './editor/manager.reducer';

/* Second Interface */
interface IEditor {
	all : IEditorAll,
	texture : IEditorTexture,
	manager : IEditorManager
}

/* Store Interface */
export interface IAppState {
	modal : IModal,
	editor : IEditor
}

/* Store Initial State */
export const INITIAL_STATE : IAppState = {
	modal : INITIAL_STATE_MODAL,
	editor : {
		all : INITIAL_STATE_EDITOR_ALL,
		texture : INITIAL_STATE_EDITOR_TEXTURE,
		manager : INITIAL_STATE_EDITOR_MANAGER
	}
}

/* Combine All Reducers */
export const AppReducer = combineReducers<IAppState>({
	modal : ModalReducer,
	editor : combineReducers<IEditor>({
		all : EditorAllReducer,
		texture : EditorTextureReducer,
		manager : EditorManagerReducer
	})
});
