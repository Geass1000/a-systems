import { Injectable } from '@angular/core';
import { IAction } from '../shared/interfaces/action.interface';

@Injectable()
export class AppActions {
	static readonly CLASS_NAME = 'AppActions:';
	static readonly TOGGLE_FULL_WIDTH_MODE = AppActions.CLASS_NAME + 'TOGGLE_FULL_WIDTH_MODE';

	toggleFullwidthMode (state : boolean) : IAction {
    return {
      type : AppActions.TOGGLE_FULL_WIDTH_MODE,
			payload : {	state : state	}
    };
  }
}
