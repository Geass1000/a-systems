import { Injectable } from '@angular/core';
import { IAction } from '../shared/interfaces/action.interface';
import { ITexture, IWorkspace, ITextureType } from '../shared/interfaces/editor.interface';

@Injectable()
export class EditorActions {
	static readonly CLASS_NAME = "EDITOR_ACTIONS:";
	static readonly SELECT_ELEMENT = EditorActions.CLASS_NAME + 'SELECT_ELEMENT';
	static readonly INIT_WORKSPACE = EditorActions.CLASS_NAME + 'INIT_WORKSPACE';
	static readonly UPDATE_WORKSPACE = EditorActions.CLASS_NAME + 'UPDATE_WORKSPACE';
	static readonly ADD_TEXTURE = EditorActions.CLASS_NAME + 'ADD_TEXTURE';
	static readonly ADD_TEXTURES = EditorActions.CLASS_NAME + 'ADD_TEXTURES';
	static readonly ADD_TEXTURE_TYPES = EditorActions.CLASS_NAME + 'ADD_TEXTURE_TYPES';
	static readonly SET_MEASURE = EditorActions.CLASS_NAME + 'SET_MEASURE';

	setMeasure (measure : string) : IAction {
    return {
      type : EditorActions.SET_MEASURE,
			payload : {
				measure : measure
			}
    };
  }
	selectElement (state : boolean) : IAction {
    return {
      type : EditorActions.SELECT_ELEMENT,
			payload : {
				state : state
			}
    };
  }
	initWorkspace (state : boolean) : IAction {
    return {
      type : EditorActions.INIT_WORKSPACE,
			payload : {
				state : state
			}
    };
  }
	updateWorkspace (workspace : IWorkspace) : IAction {
    return {
      type : EditorActions.UPDATE_WORKSPACE,
			payload : {
				workspace : workspace
			}
    };
  }
	addTexture (texture : ITexture) {
		return {
			type : EditorActions.ADD_TEXTURE,
			payload : {
				texture : texture
			}
		};
	}
	addTextures (textures : ITexture[]) {
		return {
			type : EditorActions.ADD_TEXTURES,
			payload : {
				textures : textures
			}
		};
	}
	addTextureTypes (types : ITextureType[]) {
		return {
			type : EditorActions.ADD_TEXTURE_TYPES,
			payload : {
				types : types
			}
		};
	}
}
