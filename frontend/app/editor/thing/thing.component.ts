import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';

import { LoggerService } from '../../core/logger.service';

import { Thing } from '../../shared/lib/thing.class';
import { IElement } from '../../shared/interfaces/editor.interface';
//import { Point } from '../../shared/lib/point.class';

@Component({
	moduleId: module.id,
  selector: '[as-editor-thing]',
	templateUrl: 'thing.component.html',
  styleUrls: [ 'thing.component.css' ]
})
export class ThingComponent implements OnInit, OnDestroy {
	private loc : string = '';
	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'state', 'activeElements']) activeElements$ : Observable<Array<IElement>>;
	private activeElements : Array<IElement>;
	@select(['editor', 'project', 'things']) things$ : Observable<Array<Thing>>;
	private things : Array<Thing>;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
							 private logger : LoggerService) {
		this.loc = location.href;
	}
	ngOnInit () {
		this.subscription.push(this.activeElements$.subscribe((data) => {
			this.activeElements = data;
			this.logger.info(`${this.constructor.name}:`, 'ngOnInit - Redux - activeElements -', this.activeElements);
		}));
		this.subscription.push(this.things$.subscribe((data) => {
			this.things = data;
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	/**
	 * getSrcThing - функция, возвращающая путь к файлу с моделью вещи.
	 *
	 * @kind {function}
	 * @param  {Thing} thing - элемент
	 * @return {string}
	 */
	getSrcThing (thing : Thing) : string {
		return `assets/items/${thing.url}`;
	}

	/**
	 * createFilterUrl - функция, возвращающая путь к фильтру на странице.
	 *
	 * @kind {function}
	 * @param  {string} str - название фильтра
	 * @return {string}
	 */
	createFilterUrl (str : string) : string {
		return `url(${location.href}#${str})`;
	}

	/**
	 * isActiveThing - функция, возвращающая истину, если элемент 'Thing' активен.
	 *
	 * @kind {function}
	 * @param  {number} index - номер элемента
	 * @return {boolean}
	 */
	isActiveThing (index : number) : boolean {
		if (!this.activeElements || !this.activeElements.length) {
			return false;
		}
		return this.activeElements[0].type === 'thing' && this.activeElements[0].id === index;
	}
}
