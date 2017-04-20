import { Reducer } from 'redux';
import { EditorActions } from '../../actions/editor.actions';
import { IAction } from '../../shared/interfaces/action.interface';

import { Config } from '../../config';
import * as _ from 'lodash';

export interface IEditorProject {
	name : string
}

export const INITIAL_STATE : IEditorProject = {
	name : ''
};

export const EditorProjectReducer : Reducer<IEditorProject> = (state : IEditorProject = INITIAL_STATE, action : IAction) : IEditorProject => {
	switch (action.type) {

	}
	return state
}
