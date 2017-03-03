import { Reducer } from 'redux';
import { IAction } from '../shared/interfaces/action.interface';
import { UserActions } from '../actions/user.actions';

export interface IUser {
	id : number,
	name : string
}

export const INITIAL_STATE : IUser = {
	id : -1,
	name : ''
};

export const UserReducer : Reducer<IUser> = (state = INITIAL_STATE, action : IAction) : IUser => {
	switch (action.type) {
		case UserActions.SET_USER_ID : {
			let user = Object.assign({}, state, { id : action.payload.id });
			return user;
		}
		case UserActions.SET_USER_NAME : {
			let user = Object.assign({}, state, { name : action.payload.name });
			return user;
		}
	}
	return state
}
