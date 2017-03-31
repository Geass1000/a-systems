import { Injectable } from '@angular/core';
import { IAction } from '../shared/interfaces/action.interface';
import { ITexture } from '../shared/interfaces/editor.interface';

@Injectable()
export class EditorActions {
	static readonly CLASS_NAME = "EDITOR_ACTIONS:";
	static readonly SELECT_ELEMENT = EditorActions.CLASS_NAME + 'SELECT_ELEMENT';
	static readonly INIT_WORKSPACE = EditorActions.CLASS_NAME + 'INIT_WORKSPACE';
	static readonly UPDATE_WORKSPACE_SIZE = EditorActions.CLASS_NAME + 'UPDATE_WORKSPACE_SIZE';
	static readonly ADD_TEXTURE = EditorActions.CLASS_NAME + 'ADD_TEXTURE';
	static readonly ADD_TEXTURES = EditorActions.CLASS_NAME + 'ADD_TEXTURES';

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
	updateWorkspaceSize (width : number, height : number) : IAction {
    return {
      type : EditorActions.INIT_WORKSPACE,
			payload : {
				width : width,
				height : height
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
}
