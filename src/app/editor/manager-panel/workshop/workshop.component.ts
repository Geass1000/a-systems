import { Component, OnInit, OnDestroy } from '@angular/core';

/* App Redux and Request */
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../actions/editor.actions';

/* App Services */
import { LoggerService } from '../../../core/logger.service';

/* App Interfaces and Classes */
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
	private subscription : Array<Subscription> = [];
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
			this.logger.info(`${this.constructor.name} - ngOnInit:`, 'Redux', 'itemCategories -', this.itemCategories);
		}));
		this.subscription.push(this.items$.subscribe((data) => {
			this.itemsData = data;
			this.items = Array.from(data.values());
			this.itemsDisplay = this.items.filter((d2) => d2._cid === this.activeCategory);
			this.logger.info(`${this.constructor.name} - ngOnInit:`, 'Redux', 'items -', this.items);
		}));
		this.subscription.push(this.workspace$.subscribe((data) => {
 			this.workspace = data;
 		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	/**
	 * onClickAddItem - событие, отвечающее за создание элементов на рабочей области.
	 *
	 * @kind {event}
	 * @param {MouseEvent} event
	 * @return {void}
	 */
	onClickAddItem (event : MouseEvent) : void {
		const el : Element = (<HTMLElement>event.target).closest('.item');
		if (!el) {
			return;
		}
		const itemId : string = el.getAttribute('data-item-id');
		if (!itemId) {
			return;
		}
		const item : IItem = this.itemsData.get(itemId);
		this.logger.info(`${this.constructor.name} - onClickAddItem:`, 'itemId -', itemId);
		this.logger.info(`${this.constructor.name} - onClickAddItem:`, 'item -', item);

		if (item.type === 'surface') {
			const itemSurface : ISurface = <ISurface>item.payload;
			const surface : any = new Surface(itemSurface);
			// Coord Surface
			const offset : IPoint = this.getCoordItem(500, 500);
			surface.x = offset.x;
			surface.y = offset.y;

			this.ngRedux.dispatch(this.editorActions.addSurface(surface));
		} else if (item.type === 'thing') {
			const itemThing : IThing = <IThing>item.payload;
			const thing : any = new Thing(itemThing);
			// Coord Thing
			const offset : IPoint = this.getCoordItem(itemThing.width, itemThing.height);
			thing.x = offset.x;
			thing.y = offset.y;

			this.ngRedux.dispatch(this.editorActions.addThing(thing));
		}
	}

	/**
	 * getCoordItem - функция, отвечающее за нахождение смещения элемента, относительно
	 * верхнего левого угла рабочей области.
	 *
	 * @function
	 * @param {number} itemWidth - ширина элемента
	 * @param {number} itemHeight - ширина элемента
	 * @return {IPoint}
	 */
	getCoordItem (itemWidth : number, itemHeight : number) : IPoint {
		const widthManagerPanel : number = 328;
		const heightControlPanel : number = 112;

		const windowWidth : number = document.documentElement.clientWidth  - widthManagerPanel;
		const windowHeight : number = document.documentElement.clientHeight;

		const halfItemWidth : number = itemWidth / 2;
		const halfItemHeight : number = itemHeight / 2;
		const halfWindowWidth : number = windowWidth / 2;
		const halfWindowHeight : number = (windowHeight + heightControlPanel) / 2 ;

		const elementX = halfWindowWidth  - halfItemWidth - this.workspace.x;
		const elementY = halfWindowHeight - halfItemHeight - this.workspace.y;

		const result = { x : elementX, y : elementY };
		this.logger.info(`${this.constructor.name} - addItem:`, 'result -', result);
		return result;
	}

	/**
	 * onClickSelectCategory - событие, отвечающее за переключение категорий элементов.
	 *
	 * @kind {event}
	 * @param {MouseEvent} event
	 * @return {void}
	 */
	onClickSelectCategory (event : MouseEvent) : void {
		const el : any = (<HTMLElement>event.target).closest('.item');
		if (!el) {
			this.logger.info(`${this.constructor.name} - onChangeCategory:`, 'Not navigation element');
			return;
		}
		const categoryId : string = el.getAttribute('data-category-id').toString();
		this.logger.info(`${this.constructor.name} - onChangeCategory:`, 'categoryId', categoryId);
		this.changeCategory(categoryId);
	}

	/**
	 * onClickBack - событие, отвечающее за переход в категорию на уровен выше.
	 *
	 * @kind {event}
	 * @return {type}
	 */
	onClickBack () {
		this.changeCategory(this.getParentCategoryId(this.activeCategory));
	}

	/**
	 * changeCategory - функция, выполняющая смену категории.
	 *
	 * @function
	 * @param {string} id - id категории
	 * @return {string}
	 */
	changeCategory (id : string) {
		this.activeCategory = id;
		this.prevCategory = this.getParentCategoryName(this.activeCategory);
		this.itemCategoriesDisplay = this.itemCategories.filter((data) => data._pid === this.activeCategory);
		this.logger.info(`${this.constructor.name} - onChangeCategory:`, 'prevCategory -', this.prevCategory);
		this.logger.info(`${this.constructor.name} - onChangeCategory:`, 'activeCategory -', this.activeCategory);
		this.itemsDisplay = this.items.filter((d1) => d1._cid === this.activeCategory);
	}

	/**
	 * getParentCategoryId - функция, возвращающая id категории родителя.
	 *
	 * @function
	 * @param  {string} id - id текущей категории
	 * @return {string}
	 */
	getParentCategoryId (id : string) : string {
		return id ? this.itemCategoriesData.get(id)._pid : id;
	}

	/**
	 * getParentCategoryName - функция, возвращающая название категории родителя.
	 *
	 * @function
	 * @param  {string} id - id категории
	 * @return {string}
	 */
	getParentCategoryName (id : string) : string {
		const parent = this.getParentCategoryId(id);
		return parent ? this.itemCategoriesData.get(parent).name : this.rootCategory;
	}

	/**
	 * getSrcItemPreview - функция, возвращающая путь к превью-изображению элемента.
	 *
	 * @function
	 * @param  {IItem} item - элемент
	 * @return {string}
	 */
	getSrcItemPreview (item : IItem) : string {
		return `assets/items-preview/${item.preview}`;
	}
}
