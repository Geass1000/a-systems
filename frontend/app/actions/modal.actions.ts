import { Injectable } from '@angular/core';
import { IAction } from '../shared/interfaces/action.interface';

@Injectable()
export class ModalActions {
	static readonly CLASS_NAME = "MODAL_ACTIONS:";
	static readonly OPEN_MODAL = ModalActions.CLASS_NAME + 'OPEN_MODAL(NAME)';
	static readonly CLOSE_ACTIVE_MODAL = ModalActions.CLASS_NAME + 'CLOSE_ACTIVE_MODAL';

	openModal (name : string, state : boolean = true) : IAction {
    return {
      type : ModalActions.OPEN_MODAL,
			payload : {
				name : name,
				state : state
			}
    };
  }
	closeActiveModal () : IAction {
    return {
      type : ModalActions.CLOSE_ACTIVE_MODAL
    };
  }
}
