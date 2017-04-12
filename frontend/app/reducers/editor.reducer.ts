import { Reducer } from 'redux';
import { EditorActions } from '../actions/editor.actions';
import { IAction } from '../shared/interfaces/action.interface';

import { Config } from '../config';
import * as _ from 'lodash';

import { IWorkspace, ITexture, ITextureType } from '../shared/interfaces/editor.interface';

export interface IEditor {
	isInitWorkspace : boolean,
	// Control Panel
	defMeasure : string,
	curMeasure : string,
	// Workspace
	selectElement : boolean,
	workspace : IWorkspace,
	// Textures
	textureTypes : Map<string, ITextureType>,
	textures : Map<string, ITexture>,
	textureLoad : Map<string, boolean>,
}

export const INITIAL_STATE : IEditor = {
	isInitWorkspace : false,
	// Control Panel
	defMeasure : 'px',
	curMeasure : 'm',
	// Workspace
	selectElement : false,
	workspace : _.cloneDeep(Config.workspace),
	// Textures
	textureTypes : new Map(),
	textures : new Map(),
	textureLoad : new Map()
};

export const EditorReducer : Reducer<IEditor> = (state = INITIAL_STATE, action : IAction) : IEditor => {
	switch (action.type) {
		case EditorActions.SELECT_ELEMENT : {
			return Object.assign({}, state, { selectElement : action.payload.state });
		}
		case EditorActions.INIT_WORKSPACE : {
			return Object.assign({}, state, { isInitWorkspace : action.payload.state });
		}
		case EditorActions.UPDATE_WORKSPACE : {
			let workspace : IWorkspace = _.cloneDeep(action.payload.workspace);
			return Object.assign({}, state, { workspace : workspace });
		}
		case EditorActions.ADD_TEXTURE : {
			let textures = new Map(state.textures);
			let texture = action.payload.texture;

			textures.set(texture._id, texture);
			return Object.assign({}, state, { textures : textures });
		}
		case EditorActions.ADD_TEXTURES : {
			let textures = new Map(state.textures);
			let textureLoad = new Map(state.textureLoad);
			let ATextures = action.payload.textures;

			ATextures.map((data : ITexture) => {
				textures.set(data._id, data);
				textureLoad.set(data.type, true);
			});
			return Object.assign({}, state, {
				textures : textures,
				textureLoad : textureLoad
			});
		}
		case EditorActions.ADD_TEXTURE_TYPES : {
			let textureTypes = new Map(state.textureTypes);
			let textureLoad = new Map(state.textureLoad);
			let ATypes = action.payload.types;

			ATypes.map((data : ITextureType) => {
				textureTypes.set(data._id, data);
				textureLoad.set(data._id, false);
			});
			return Object.assign({}, state, {
				textureTypes : textureTypes,
				textureLoad : textureLoad
			});
		}
		case EditorActions.UPDATE_TEXTURE_LOAD : {
			let textureLoad = new Map(state.textureLoad);
			textureLoad.set(action.payload._id, action.payload.state);
			return Object.assign({}, state, {
				textureLoad : textureLoad
			});
		}
		case EditorActions.SET_MEASURE : {
			return Object.assign({}, state, { curMeasure : action.payload.measure });
		}
	}
	return state
}
