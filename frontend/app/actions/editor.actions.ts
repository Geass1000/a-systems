import { Injectable } from '@angular/core';
import { IAction } from '../shared/interfaces/action.interface';
import { ITexture, IWorkspace, ITextureType, IItemCategory } from '../shared/interfaces/editor.interface';

@Injectable()
export class EditorActions {
	static readonly CLASS_NAME = 'EDITOR_ACTIONS:';
	/* State Action */
	static readonly SELECT_ELEMENT = EditorActions.CLASS_NAME + 'SELECT_ELEMENT';
	static readonly INIT_WORKSPACE = EditorActions.CLASS_NAME + 'INIT_WORKSPACE';
	static readonly ACTIVE_METRIC = EditorActions.CLASS_NAME + 'ACTIVE_METRIC';
	static readonly SET_MEASURE = EditorActions.CLASS_NAME + 'SET_MEASURE';
	static readonly INIT_PROJECT = EditorActions.CLASS_NAME + 'INIT_PROJECT';
	/* Texture Action */
	static readonly ADD_TEXTURE = EditorActions.CLASS_NAME + 'ADD_TEXTURE';
	static readonly ADD_TEXTURES = EditorActions.CLASS_NAME + 'ADD_TEXTURES';
	static readonly ADD_TEXTURE_TYPES = EditorActions.CLASS_NAME + 'ADD_TEXTURE_TYPES';
	static readonly UPDATE_TEXTURE_LOAD = EditorActions.CLASS_NAME + 'UPDATE_TEXTURE_LOAD';
	/* Manager Action */
	static readonly OPEN_MANAGER_PANEL = EditorActions.CLASS_NAME + 'OPEN_MANAGER_PANEL';
	static readonly CLOSE_ACTIVE_MANAGER_PANEL = EditorActions.CLASS_NAME + 'CLOSE_ACTIVE_MANAGER_PANEL';
	/* Item Action */
	static readonly ADD_ITEM_CATEGORIES = EditorActions.CLASS_NAME + 'ADD_ITEM_CATEGORIES';
	static readonly SET_ACTIVE_ITEM_CATEGORIES = EditorActions.CLASS_NAME + 'SET_ACTIVE_ITEM_CATEGORIES';
	/* Project Action */
	static readonly UPDATE_WORKSPACE = EditorActions.CLASS_NAME + 'UPDATE_WORKSPACE';
	static readonly UPDATE_PROJECT_NAME = EditorActions.CLASS_NAME + 'UPDATE_PROJECT_NAME';

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
	activeMetric (state : boolean) : IAction {
    return {
      type : EditorActions.ACTIVE_METRIC,
			payload : {
				state : state
			}
    };
  }
	initProject (state : boolean) : IAction {
    return {
      type : EditorActions.INIT_PROJECT,
			payload : {
				state : state
			}
    };
  }
	/* Texture Action*/
	addTexture (texture : ITexture) : IAction {
		return {
			type : EditorActions.ADD_TEXTURE,
			payload : {
				texture : texture
			}
		};
	}
	addTextures (textures : ITexture[]) : IAction {
		return {
			type : EditorActions.ADD_TEXTURES,
			payload : {
				textures : textures
			}
		};
	}
	addTextureTypes (types : ITextureType[]) : IAction {
		return {
			type : EditorActions.ADD_TEXTURE_TYPES,
			payload : {
				types : types
			}
		};
	}
	updateTextureLoad (_id : string, state : boolean) : IAction {
		return {
			type : EditorActions.UPDATE_TEXTURE_LOAD,
			payload : {
				_id : _id,
				state : state
			}
		};
	}

	/* Manager Action */
	openManagerPanel (name : string) : IAction {
		return {
			type : EditorActions.OPEN_MANAGER_PANEL,
			payload : {
				name : name
			}
		};
	}
	closeActiveManagerPanel () : IAction {
		return {
			type : EditorActions.CLOSE_ACTIVE_MANAGER_PANEL
		};
	}
	/* Item Action */
	addItemCategories (categories : IItemCategory[]) : IAction {
		return {
			type : EditorActions.ADD_ITEM_CATEGORIES,
			payload : {
				categories : categories
			}
		};
	}
	setActiveItemCategories (category : string) : IAction {
		return {
			type : EditorActions.ADD_ITEM_CATEGORIES,
			payload : {
				category : category
			}
		};
	}
	/* Project Action */
	updateWorkspace (workspace : IWorkspace) : IAction {
    return {
      type : EditorActions.UPDATE_WORKSPACE,
			payload : {
				workspace : workspace
			}
    };
  }
	updateProjectName (name : string) : IAction {
    return {
      type : EditorActions.UPDATE_PROJECT_NAME,
			payload : {
				name : name
			}
    };
  }
}
