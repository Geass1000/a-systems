import { Reducer } from 'redux';
import { EditorActions } from '../actions/editor.actions';
import { IAction } from '../shared/interfaces/action.interface';

import { Config } from '../config';
import * as _ from 'lodash';

import { IWorkspace, ITexture } from '../shared/interfaces/editor.interface';
import { IMap } from '../shared/interfaces/type.interface';

export interface IEditor {
	openInitWorkspace : boolean,
	isInitWorkspace : boolean,
	defMeasure : string,
	curMeasure : string,
	selectElement : boolean,
	workspace : IWorkspace,
	textures : IMap<ITexture>
}

export const INITIAL_STATE : IEditor = {
	openInitWorkspace : false,
	isInitWorkspace : false,
	defMeasure : 'px',
	curMeasure : 'm',
	selectElement : false,
	workspace : _.cloneDeep(Config.workspace),
	textures : {}
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
		case EditorActions.SET_MEASURE : {
			return Object.assign({}, state, { curMeasure : action.payload.measure });
		}
	}
	return state
}
