import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../actions/editor.actions';

import { LoggerService } from '../../../core/logger.service';

import { IItem, IItemCategory } from '../../../shared/interfaces/editor.interface';
import { ISurface, Surface } from '../../../shared/lib/surface.class';
import { IThing, Thing } from '../../../shared/lib/thing.class';
import { Workspace } from '../../../shared/lib/workspace.class';
import { IPoint } from '../../../shared/lib/point.class';

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
	@select(['editor', 'project', 'workspace']) workspace$ : Observable<Workspace>;
	private workspace : Workspace;

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
		this.subscription.push(this.workspace$.subscribe((data) => {
 			this.workspace = data;
 		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	/* Events */
	onClickAddItem (event : MouseEvent) {
		let el : Element = (<HTMLElement>event.target).closest('.item');
		if (!el) {
			return;
		}
		if (!el.getAttribute('data-item-id')) {
			return;
		}
		let itemId : string = el.getAttribute('data-item-id').toString();
		let item : IItem = this.itemsData.get(itemId);
		this.logger.info(`${this.constructor.name}:`, 'addItem -', itemId);
		this.logger.info(`${this.constructor.name}:`, 'addItem -', item);

		if (item.type === 'surface') {
			let itemSurface : ISurface = <ISurface>item.payload;
			let surface : any = new Surface(itemSurface);
			// Coord Surface
			let offset : IPoint = this.getCoordItem(500, 500);
			surface.x = offset.x;
			surface.y = offset.y;

			this.ngRedux.dispatch(this.editorActions.addSurface(surface));
		} else if (item.type === 'thing') {
			let itemThing : IThing = <IThing>item.payload;
			let thing : any = new Thing(itemThing);
			// Coord Thing
			let offset : IPoint = this.getCoordItem(itemThing.width, itemThing.height);
			thing.x = offset.x;
			thing.y = offset.y;

			this.ngRedux.dispatch(this.editorActions.addThing(thing));
		}
	}

	getCoordItem (itemWidth : number, itemHeight : number) : IPoint {
		let widthManagerPanel : number = 328;
		let heightControlPanel : number = 112;
		let windowWidth  : number = document.documentElement.clientWidth  - widthManagerPanel,
				windowHeight : number = document.documentElement.clientHeight;

		let halfItemWidth  : number = itemWidth / 2,
				halfItemHeight : number = itemHeight / 2;
		let halfWindowWidth  : number = windowWidth / 2,
				halfWindowHeight : number = (windowHeight + heightControlPanel) / 2 ;

		let elementX = halfWindowWidth  - halfItemWidth - this.workspace.x;
		let elementY = halfWindowHeight - halfItemHeight - this.workspace.y;
		let result = { x : elementX, y : elementY };
		this.logger.info(`${this.constructor.name}:`, 'addItem -', result);
		return result;
	}

	onClickSelectCategory (event : any) {
		let el : any = event.target.closest('.item');
		if (!el) {
			this.logger.info(`${this.constructor.name}:`, 'onChangeCategory - Not navigation element');
			return;
		}
		let categoryId : string = el.getAttribute('data-category-id').toString();
		this.logger.info(`${this.constructor.name}:`, 'onChangeCategory - categoryId', categoryId);
		if (categoryId === 'back') {
			this.activeCategory = this.getParentCategoryId(this.activeCategory);
		} else {
			this.activeCategory = categoryId;
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
