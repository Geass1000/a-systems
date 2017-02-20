import { combineReducers } from 'redux';

/* Store Interfaces */
import { IModal } from './modal.reducer';

/* Reducers */
import { ModalReducer } from './modal.reducer';

/* Store Initial States */
import { INITIAL_STATE as MODAL_INITIAL_STATE } from './modal.reducer';

/* Store Interface */
export interface IAppState {
	modal : IModal
}

/* Store Initial State */
export const INITIAL_STATE : IAppState = {
	modal : MODAL_INITIAL_STATE
}

/* Combine All Reducers */
export const AppReducer = combineReducers<IAppState>({
	modal : ModalReducer
});
