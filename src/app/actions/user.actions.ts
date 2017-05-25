import { Injectable } from '@angular/core';
import { IAction } from '../shared/interfaces/action.interface';

@Injectable()
export class UserActions {
	static readonly CLASS_NAME = 'USER_ACTIONS:';
	static readonly SET_USER_ID = UserActions.CLASS_NAME + 'SET_USER_ID';
	static readonly SET_USER_NAME = UserActions.CLASS_NAME + 'SET_USER_NAME';
	static readonly RESET_STORE_USER = UserActions.CLASS_NAME + 'RESET_STORE_USER';

	setUserId (id : number) : IAction {
		if (!id) {
			throw new Error('Id required!');
		}
    return {
      type : UserActions.SET_USER_ID,
			payload : {
				id : id
			}
    };
  }
	setUserName (name : string) : IAction {
		if (!name) {
			throw new Error('Name required!');
		}
    return {
      type : UserActions.SET_USER_NAME,
			payload : {
				name : name
			}
    };
  }

	resetStoreUser () : IAction {
    return {
      type : UserActions.RESET_STORE_USER,
			payload : {	}
    };
  }
}
