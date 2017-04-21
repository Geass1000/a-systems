import { Action } from 'redux';

export interface IAction extends Action {
	payload ?: any;
}
