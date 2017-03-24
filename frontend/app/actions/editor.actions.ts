import { Injectable } from '@angular/core';
import { IAction } from '../shared/interfaces/action.interface';

@Injectable()
export class EditorActions {
	static readonly CLASS_NAME = "EDITOR_ACTIONS:";
	static readonly SELECT_ELEMENT = EditorActions.CLASS_NAME + 'SELECT_ELEMENT';
	static readonly INIT_WORKSPACE = EditorActions.CLASS_NAME + 'INIT_WORKSPACE';

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
}
