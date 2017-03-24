import { Injectable } from '@angular/core';
import { IAction } from '../shared/interfaces/action.interface';

@Injectable()
export class ModalActions {
	static readonly OPEN_MODAL = 'OPEN_MODAL(NAME)';
	static readonly CLOSE_ALL_MODAL = 'CLOSE_ALL_MODAL';

	openModal (name : string) : IAction {
		if (!name) throw new Error("Name modal required!");
    return {
      type : ModalActions.OPEN_MODAL,
			payload : {
				name : name
			}
    };
  }
	closeAllModal () : IAction {
    return {
      type : ModalActions.CLOSE_ALL_MODAL
    };
  }
}