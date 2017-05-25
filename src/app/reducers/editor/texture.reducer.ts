import { Reducer } from 'redux';
import { EditorActions } from '../../actions/editor.actions';
import { IAction } from '../../shared/interfaces/action.interface';

import { ITexture, ITextureCategory } from '../../shared/interfaces/editor.interface';

export interface IEditorTexture {
	categories : Map<string, ITextureCategory>;
	textures : Map<string, ITexture>;
}

export const INITIAL_STATE : IEditorTexture = {
	categories : new Map(),
	textures : new Map()
};

export const EditorTextureReducer : Reducer<IEditorTexture> =
	(state : IEditorTexture = INITIAL_STATE, action : IAction) : IEditorTexture => {
	switch (action.type) {
		case EditorActions.ADD_TEXTURE : {
			const textures = new Map(state.textures);
			const texture = action.payload.texture;

			textures.set(texture._id, texture);
			return Object.assign({}, state, { textures : textures });
		}
		case EditorActions.ADD_TEXTURES : {
			const textures = new Map(state.textures);
			const ATextures = action.payload.textures;

			ATextures.map((data : ITexture) => {
				textures.set(data._id, data);
			});
			return Object.assign({}, state, {
				textures : textures
			});
		}
		case EditorActions.ADD_TEXTURE_CATEGORIES : {
			const categories = new Map(state.categories);
			const ATypes = action.payload.categories;

			ATypes.map((data : ITextureCategory) => {
				categories.set(data._id, data);
			});
			return Object.assign({}, state, {
				categories : categories
			});
		}
	}
	return state;
};
