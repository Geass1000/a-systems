import { Reducer } from 'redux';
import { IAction } from '../shared/interfaces/action.interface';
import { UserActions } from '../actions/user.actions';

export interface IUser {
	id : string;
	name : string;
}

export const INITIAL_STATE : IUser = {
	id : null,
	name : null
};

export const UserReducer : Reducer<IUser> = (state = INITIAL_STATE, action : IAction) : IUser => {
	switch (action.type) {
		case UserActions.RESET_STORE_USER : {
			return INITIAL_STATE;
		}
		case UserActions.SET_USER_ID : {
			return Object.assign({}, state, { id : action.payload.id });
		}
		case UserActions.SET_USER_NAME : {
			return Object.assign({}, state, { name : action.payload.name });
		}
	}
	return state;
};
