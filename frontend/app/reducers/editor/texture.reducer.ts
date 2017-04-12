import { Reducer } from 'redux';
import { EditorActions } from '../../actions/editor.actions';
import { IAction } from '../../shared/interfaces/action.interface';

import { Config } from '../../config';
import * as _ from 'lodash';

import { IWorkspace, ITexture, ITextureType } from '../../shared/interfaces/editor.interface';

export interface IEditorTexture {
	types : Map<string, ITextureType>,
	textures : Map<string, ITexture>,
	loaded : Map<string, boolean>
}

export const INITIAL_STATE : IEditorTexture = {
	types : new Map(),
	textures : new Map(),
	loaded : new Map()
};

export const EditorTextureReducer : Reducer<IEditorTexture> = (state : IEditorTexture = INITIAL_STATE, action : IAction) : IEditorTexture => {
	switch (action.type) {
		case EditorActions.ADD_TEXTURE : {
			let textures = new Map(state.textures);
			let texture = action.payload.texture;

			textures.set(texture._id, texture);
			return Object.assign({}, state, { textures : textures });
		}
		case EditorActions.ADD_TEXTURES : {
			let textures = new Map(state.textures);
			let loaded = new Map(state.loaded);
			let ATextures = action.payload.textures;

			ATextures.map((data : ITexture) => {
				textures.set(data._id, data);
				loaded.set(data.type, true);
			});
			return Object.assign({}, state, {
				textures : textures,
				loaded : loaded
			});
		}
		case EditorActions.ADD_TEXTURE_TYPES : {
			let types = new Map(state.types);
			let loaded = new Map(state.loaded);
			let ATypes = action.payload.types;

			ATypes.map((data : ITextureType) => {
				types.set(data._id, data);
				loaded.set(data._id, false);
			});
			return Object.assign({}, state, {
				types : types,
				loaded : loaded
			});
		}
		case EditorActions.UPDATE_TEXTURE_LOAD : {
			let loaded = new Map(state.loaded);
			loaded.set(action.payload._id, action.payload.state);
			return Object.assign({}, state, {
				loaded : loaded
			});
		}
	}
	return state
}
