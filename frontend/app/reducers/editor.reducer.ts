import { Reducer } from 'redux';
import { IAction } from '../shared/interfaces/action.interface';
import { IWorkspace, ITexture } from '../shared/interfaces/editor.interface';
import { EditorActions } from '../actions/editor.actions';

export interface IEditor {
	isInit : boolean,
	selectElement : boolean,
	workspace : IWorkspace,
	textures : ITexture[]
}

export const INITIAL_STATE : IEditor = {
	isInit : false,
	selectElement : false,
	workspace : {
		width : 2000,
		height : 2000
	},
	textures : []
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
			let textures = state.textures;
			if (textures.filter((data) => data._id === action.payload.texture._id).length !== 0) {
				return state
			}
			textures = [...textures, action.payload.texture];
			return Object.assign({}, state, { textures : textures });
		}
	}
	return state
}
