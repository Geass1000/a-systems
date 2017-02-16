import { IAction } from './shared/interfaces/action.interface';
import { AppActions } from './app.actions';

export interface AppState {
	modal : {
		open : boolean,
		login : boolean
	};
}

export const INITIAL_STATE: AppState = {
	modal : {
		open : false,
		login : false
	},
};

export function AppReducer(state = INITIAL_STATE, action: IAction): AppState {
	switch (action.type) {
		case AppActions.OPEN_MODAL : {
			let modal = Object.assign({}, state.modal, { open : true });
			modal[action.payload.name] = true;
			return Object.assign({}, state, { modal : modal });
		}
		case AppActions.CLOSE_ALL_MODAL : {
			let modal = Object.assign({}, state.modal);
			for (let i in modal) {
				modal[i] = false;
			}
			return Object.assign({}, state, { modal : modal });
		}
	}
	return state
}
