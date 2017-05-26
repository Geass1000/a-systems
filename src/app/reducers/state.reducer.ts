import { Reducer } from 'redux';
import { IAction } from '../shared/interfaces/action.interface';
import { AppActions } from '../actions/app.actions';

export interface IState {
	fullwidthMode : boolean;
}

export const INITIAL_STATE : IState = {
	fullwidthMode : false
};

export const StateReducer : Reducer<IState> = (state = INITIAL_STATE, action : IAction) : IState => {
	switch (action.type) {
		case AppActions.TOGGLE_FULL_WIDTH_MODE : {
			return Object.assign({}, state, {
				fullwidthMode : action.payload.state
			});
		}
	}
	return state;
};
