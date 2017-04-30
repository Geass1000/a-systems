import { Reducer } from 'redux';
import { EditorActions } from '../../actions/editor.actions';
import { IAction } from '../../shared/interfaces/action.interface';

import { IItem, IItemCategory } from '../../shared/interfaces/editor.interface';

export interface IEditorItem {
	categories : Map<string, IItemCategory>;
	activeCategory : string;
	items : Map<string, IItem>;
}

export const INITIAL_STATE : IEditorItem = {
	categories : new Map(),
	activeCategory : null,
	items : new Map()
};

export const EditorItemReducer : Reducer<IEditorItem> = (state : IEditorItem = INITIAL_STATE, action : IAction) : IEditorItem => {
	switch (action.type) {
		case EditorActions.ADD_ITEM_CATEGORIES : {
			let categories = new Map(state.categories);
			let ACategories = action.payload.categories;

			ACategories.map((data : IItemCategory) => {
				categories.set(data._id, data);
			});
			return Object.assign({}, state, {
				categories : categories
			});
		}
		case EditorActions.ADD_ITEMS : {
			let items = new Map(state.items);
			let AItems = action.payload.items;

			AItems.map((data : IItem) => {
				items.set(data._id, data);
			});
			return Object.assign({}, state, {
				items : items
			});
		}
	}
	return state;
};
