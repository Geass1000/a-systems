import { Reducer } from 'redux';
import { IAction } from '../shared/interfaces/action.interface';
import { ModalActions } from '../actions/modal.actions';

export interface IModal {
	open : boolean,
	login : boolean,
	signup : boolean,
	reset : boolean
}

export const INITIAL_STATE : IModal = {
	open : false,
	login : false,
	signup : false,
	reset : false
};

export const ModalReducer : Reducer<IModal> = (state = INITIAL_STATE, action : IAction) : IModal => {
	switch (action.type) {
		case ModalActions.OPEN_MODAL : {
			let modal = Object.assign({}, state, { open : true });
			modal[action.payload.name] = true;
			return modal;
		}
		case ModalActions.CLOSE_ALL_MODAL : {
			let modal = Object.assign({}, state);
			for (let i in modal) {
				modal[i] = false;
			}
			return modal;
		}
	}
	return state
}
