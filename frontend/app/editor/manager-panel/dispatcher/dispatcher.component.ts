import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../actions/editor.actions';

import { LoggerService } from '../../../core/logger.service';

import { Workspace } from '../../../shared/lib/workspace.class';
import { Surface } from '../../../shared/lib/surface.class';
import { Thing } from '../../../shared/lib/thing.class';

import { IElement } from '../../../shared/interfaces/editor.interface';

@Component({
	moduleId: module.id,
  selector: 'as-editor-manager-dispatcher',
	templateUrl: 'dispatcher.component.html',
  styleUrls: [ 'dispatcher.component.css' ]
})
export class DispatcherComponent implements OnInit, OnDestroy {
	/* Private Variable */

	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['editor', 'state', 'activeElements']) activeElements$ : Observable<Array<IElement>>;
	private activeElements : Array<IElement>;
	@select(['editor', 'project', 'workspace']) workspace$ : Observable<Workspace>;
	private workspace : Workspace;
	@select(['editor', 'project', 'surfaces']) surfaces$ : Observable<Array<Surface>>;
	private surfaces : Array<Surface>;
	@select(['editor', 'project', 'things']) things$ : Observable<Array<Thing>>;
	private things : Array<Thing>;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
							 private logger : LoggerService) {
	}
	ngOnInit () {
		this.subscription.push(this.activeElements$.subscribe((data) => {
			this.activeElements = data;
			this.logger.info(`${this.constructor.name} - ngOnInit:`, 'Redux', 'activeElements -', this.activeElements);
		}));
		this.subscription.push(this.workspace$.subscribe((data) => {
 			this.workspace = data;
 		}));
		this.subscription.push(this.surfaces$.subscribe((data) => {
 			this.surfaces = data;
 		}));
		this.subscription.push(this.things$.subscribe((data) => {
 			this.things = data;
 		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	/**
	 * isActive - функция, отвечающее за установку активного элемента.
	 *
	 * @kind {function}
	 * @param {string} type - тип элемента
	 * @param {number} id - id элемента
	 * @return {boolean}
	 */
	isActive (type : string, id : number) : boolean {
		if (!type || !isFinite(id) || !this.activeElements) {
			return false;
		}
		switch (type) {
			case 'workspace' : {
				return !this.activeElements.length;
			}
			case 'surface' :
			case 'thing' : {
				if (!this.activeElements.length) {
					return false;
				}
				return this.activeElements[0].type === type && this.activeElements[0].id === id;
			}
		}
	}

	/**
	 * onClickSetElement - событие, отвечающее за установку активного элемента.
	 *
	 * @kind {event}
	 * @param {MouseEvent} event - объект события
	 * @return {void}
	 */
	onClickSetElement (event : MouseEvent) : void {
		let el : Element = (<Element>event.target).closest('.item');
		if (!el) {
			return;
		}
		let itemType : string = el.getAttribute('data-item-type');
		let itemId : number = +el.getAttribute('data-item-id');
		if (!isFinite(itemId) || !itemType) {
			return;
		}
		let els : IElement = {
			type : itemType,
			id : itemId,
			capture : true
		};
		let result : Array<IElement> = itemType === 'workspace' ? [] : [els];
		this.ngRedux.dispatch(this.editorActions.setActiveElements(result));
	}
}
