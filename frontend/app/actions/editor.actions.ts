import { Injectable } from '@angular/core';
import { IAction } from '../shared/interfaces/action.interface';

@Injectable()
export class EditorActions {
	static readonly SELECT_ELEMENT = 'SELECT_ELEMENT';

	selectElement (state : boolean) : IAction {
    return {
      type : EditorActions.SELECT_ELEMENT,
			payload : {
				state : state
			}
    };
  }
}
