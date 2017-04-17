import { Reducer } from 'redux';
import { EditorActions } from '../../actions/editor.actions';
import { IAction } from '../../shared/interfaces/action.interface';

import { Config } from '../../config';
import * as _ from 'lodash';

import { IWorkspace, IItemCategory } from '../../shared/interfaces/editor.interface';

export interface IEditorItem {
	categories : Map<string, IItemCategory>,
	loaded : Map<string, boolean>,
	activeCategory : string
}

export const INITIAL_STATE : IEditorItem = {
	categories : new Map(),
	loaded : new Map(),
	activeCategory : null
};

export const EditorItemReducer : Reducer<IEditorItem> = (state : IEditorItem = INITIAL_STATE, action : IAction) : IEditorItem => {
	switch (action.type) {
		case EditorActions.ADD_ITEM_CATEGORIES : {
			let categories = new Map(state.categories);
			let loaded = new Map(state.loaded);
			let ACategories= action.payload.categories;

			ACategories.map((data : IItemCategory) => {
				categories.set(data._id, data);
				loaded.set(data._id, false);
			});
			return Object.assign({}, state, {
				categories : categories,
				loaded : loaded
			});
		}
		case EditorActions.SET_ACTIVE_ITEM_CATEGORIES : {
			return state;
		}
	}
	return state
}
