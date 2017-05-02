import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../actions/editor.actions';

import { LoggerService } from '../../../core/logger.service';

import { IItem, IItemCategory } from '../../../shared/interfaces/editor.interface';
import { ISurface, Surface } from '../../../shared/lib/surface.class';
import { IThing, Thing } from '../../../shared/lib/thing.class';

@Component({
	moduleId: module.id,
  selector: 'as-editor-manager-workshop',
	templateUrl: 'workshop.component.html',
  styleUrls: [ 'workshop.component.css' ]
})
export class WorkshopComponent implements OnInit, OnDestroy {
	/* Private Variable */
	private rootCategory : string = 'Root';
	private prevCategory : string = this.rootCategory;
	private activeCategory : string = null;

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'item', 'categories']) itemCategories$ : Observable<Map<string, IItemCategory>>;
	private itemCategoriesData : Map<string, IItemCategory> = new Map();
	private itemCategories : Array<IItemCategory> = [];
	private itemCategoriesDisplay : Array<IItemCategory> = [];
	@select(['editor', 'item', 'items']) items$ : Observable<Map<string, IItem>>;
	private itemsData : Map<string, IItem> = new Map();
	private items : Array<IItem> = [];
	private itemsDisplay : Array<IItem> = [];

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
							 private logger : LoggerService) {
	}
	ngOnInit () {
		this.subscription.push(this.itemCategories$.subscribe((data) => {
			this.itemCategoriesData = data;
			this.itemCategories = Array.from(data.values());
			this.itemCategoriesDisplay = this.itemCategories.filter((d2) => d2._pid === this.activeCategory);
			this.logger.info(`${this.constructor.name}:`, 'ngOnInit - Redux - itemCategories -', this.itemCategories);
		}));
		this.subscription.push(this.items$.subscribe((data) => {
			this.itemsData = data;
			this.items = Array.from(data.values());
			this.itemsDisplay = this.items.filter((d2) => d2._cid === this.activeCategory);
			this.logger.info(`${this.constructor.name}:`, 'ngOnInit - Redux - items -', this.items);
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	/* Events */
	addElement (event : any) {
		let el : any = event.target.closest('.form-item');
		if (!el) {
			return;
		}
		let id : string = el.dataset.itemId;
		let element : IItem = this.itemsData.get(id);
		this.logger.info(`${this.constructor.name}:`, 'addElement -', id);
		this.logger.info(`${this.constructor.name}:`, 'addElement -', this.itemsData.get(id));
		if (element.type === 'surface') {
			let offsetX : number = 300;
			let offsetY : number = 300;
			let surface : any = new Surface(<ISurface>element.payload);
			surface.x = offsetX;
			surface.y = offsetY;
			this.ngRedux.dispatch(this.editorActions.addSurface(surface));
		} else if (element.type === 'thing') {
			let offsetX : number = 300;
			let offsetY : number = 300;
			let thing : any = new Thing(<IThing>element.payload);
			thing.x = offsetX;
			thing.y = offsetY;
			thing.url = element._id;
			this.ngRedux.dispatch(this.editorActions.addThing(thing));
		}
		console.log(this.ngRedux.getState().editor.project);
	}
	onChangeCategory (event : any) {
		let el : any = event.target.closest('.form-item');
		if (!el) {
			this.logger.info(`${this.constructor.name}:`, 'onChangeCategory - Not navigation element');
			return;
		}
		this.logger.info(`${this.constructor.name}:`, 'onChangeCategory - categoryId', el.dataset.categoryId);
		if (el.dataset.categoryId === 'back') {
			this.activeCategory = this.getParentCategoryId(this.activeCategory);
		} else {
			this.activeCategory = el.dataset.categoryId;
		}
		this.prevCategory = this.getParentCategoryName(this.activeCategory);
		this.itemCategoriesDisplay = this.itemCategories.filter((data) => data._pid === this.activeCategory);

		this.logger.info(`${this.constructor.name}:`, 'onChangeCategory - prevCategory -', this.prevCategory);
		this.logger.info(`${this.constructor.name}:`, 'onChangeCategory - activeCategory -', this.activeCategory);
		this.itemsDisplay = this.items.filter((d1) => d1._cid === this.activeCategory);
	}
	getParentCategoryId (id : string) {
		return id ? this.itemCategoriesData.get(id)._pid : id;
	}
	getParentCategoryName (id : string) {
		let parent = this.getParentCategoryId(id);
		return parent ? this.itemCategoriesData.get(parent).name : this.rootCategory;
	}

	getSrcItemPreview (item : IItem) {
		return `assets/items-preview/${item._id}.png`;
	}
}
