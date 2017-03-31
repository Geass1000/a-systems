import { Reducer } from 'redux';
import { EditorActions } from '../actions/editor.actions';
import { IAction } from '../shared/interfaces/action.interface';

import { IWorkspace, ITexture } from '../shared/interfaces/editor.interface';
import { IMap } from '../shared/interfaces/type.interface';

export interface IEditor {
	isInit : boolean,
	selectElement : boolean,
	workspace : IWorkspace,
	textures : IMap<ITexture>
}

export const INITIAL_STATE : IEditor = {
	isInit : false,
	selectElement : false,
	workspace : {
		width : 2000,
		height : 2000
	},
	textures : {}
};

export const EditorReducer : Reducer<IEditor> = (state = INITIAL_STATE, action : IAction) : IEditor => {
	switch (action.type) {
		case EditorActions.SELECT_ELEMENT : {
			return Object.assign({}, state, { selectElement : action.payload.state });
		}
		case EditorActions.INIT_WORKSPACE : {
			return Object.assign({}, state, { isInit : action.payload.state });
		}
		case EditorActions.UPDATE_WORKSPACE_SIZE : {
			let workspace = state.workspace;
			Object.assign(workspace, {
				width : action.payload.width,
				height : action.payload.height
			});
			return Object.assign({}, state, { workspace : workspace });
		}
		case EditorActions.ADD_TEXTURE : {
			let textures = Object.assign({}, state.textures);
			let texture = action.payload.texture;

			textures[texture._id] = texture;
			return Object.assign({}, state, { textures : textures });
		}
		case EditorActions.ADD_TEXTURES : {
			let textures = Object.assign({}, state.textures);
			let ATextures = action.payload.textures;

			ATextures.map((data : ITexture) => { textures[data._id] = data });
			return Object.assign({}, state, { textures : textures });
		}
	}
	return state
}
