import { Injectable } from '@angular/core';
import { IAction } from '../shared/interfaces/action.interface';

@Injectable()
export class UserActions {
	static readonly SET_USER_ID = 'SET_USER_ID(ID)';
	static readonly SET_USER_NAME = 'SET_USER_NAME(NAME)';

	setUserId (id : number) : IAction {
		if (!id) throw new Error("Id required!");
    return {
      type : UserActions.SET_USER_ID,
			payload : {
				id : id
			}
    };
  }
	setUserName (name : string) : IAction {
		if (!name) throw new Error("Name required!");
    return {
      type : UserActions.SET_USER_NAME,
			payload : {
				name : name
			}
    };
  }
}
