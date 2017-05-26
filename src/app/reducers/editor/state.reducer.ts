import { Reducer } from 'redux';
import { EditorActions } from '../../actions/editor.actions';
import { IAction } from '../../shared/interfaces/action.interface';

import * as _ from 'lodash';

import { IElement } from '../../shared/interfaces/editor.interface';
import { Material } from '../../shared/lib/material.class';

export interface IEditorState {
	// Init Editor
	isInitProject : boolean;
	// Metrc Service
	isActiveMetric : boolean;
	curMeasure : string;
	// DragAndDrop
	isMove : boolean;
	element : IElement;
	activeElements : Array<IElement>;
	material : Material;
}

export const INITIAL_STATE : IEditorState = {
	// Init Editor
	isInitProject : false,
	// Metrc Service
	isActiveMetric : false,
	curMeasure : 'm',
	// DragAndDrop
	isMove : false,
	element : null,
	activeElements : [],
	// Material Module
	material : null
};

export const EditorStateReducer : Reducer<IEditorState> =
	(state : IEditorState = INITIAL_STATE, action : IAction) : IEditorState => {
	switch (action.type) {
		case EditorActions.RESET_PROJECT : {
			return Object.assign({}, state, INITIAL_STATE, {
				isActiveMetric : state.isActiveMetric,
				curMeasure : state.curMeasure
			});
		}
		case EditorActions.INIT_PROJECT : {
			return Object.assign({}, state, { isInitProject : action.payload.state });
		}
		case EditorActions.ACTIVE_METRIC : {
			return Object.assign({}, state, { isActiveMetric : action.payload.state });
		}
		case EditorActions.SET_MEASURE : {
			return Object.assign({}, state, { curMeasure : action.payload.measure });
		}
		case EditorActions.TOGGLE_MOVE : {
			return Object.assign({}, state, { isMove : action.payload.state });
		}
		case EditorActions.SET_ACTIVE_ELEMENTS : {
			if (compareActiveElements(state.activeElements, action.payload.elements)) {
				return state;
			}
			const activeElements = [...action.payload.elements];
			return Object.assign({}, state, { activeElements : activeElements });
		}
		case EditorActions.SET_MATERIAL : {
			return Object.assign({}, state, { material : action.payload.material });
		}
		case EditorActions.UPDATE_MATERIAL : {
			const newState : IEditorState = Object.assign({}, state);
			const material = action.payload.material;
			newState.material.type = material.type;
			newState.material.data = material.data;
			return newState;
		}
	}
	return state;
};

/**
 * compareActiveElements - функция, выполняющая проверку на равенство двух массивов
 * активных элементов.
 *
 * @function
 * @param {Array<IElement>} el1
 * @param {Array<IElement>} el2
 * @return {boolean}
 */
function compareActiveElements (el1 : Array<IElement>, el2 : Array<IElement>) : boolean {
	if (!el1 || !el2 || el1.length !== el2.length) {
		return false;
	}
	if (!el1.length) {
		return true;
	}
	const confirm : boolean = el1.every((data, index) => {
		return data.id === el2[index].id && data.type === el2[index].type;
	});
	return confirm;
}
