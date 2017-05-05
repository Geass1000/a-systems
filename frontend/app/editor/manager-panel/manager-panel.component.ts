import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';
import { ModalActions } from '../../actions/modal.actions';

import { LoggerService } from '../../core/logger.service';

@Component({
	moduleId: module.id,
  selector: 'as-editor-manager-panel',
	templateUrl: 'manager-panel.component.html',
  styleUrls: [ 'manager-panel.component.css' ],
	animations: [
		trigger('flyInOut', [
			state('close', style({ opacity: '1' })),
			state('open', style({
				transform: 'translateX(0)',
				opacity: '1'
			})),
			transition('void => open', [
				style({
					transform: 'translateX(100%)',
					opacity: '0'
				}),
				animate(200)
			]),
			transition('open => void', [
				animate(200, style({
					transform: 'translateX(-100%)',
					opacity: '0'
				}))
			]),
		]),
		trigger('togglePanel', [
			state('close', style({
				transform: 'translateX(100%)',
			})),
			state('open', style({
				transform: 'translateX(0)',
			})),
			transition('close <=> open', animate('200ms ease-in'))
		])
	]
})
export class ManagerPanelComponent implements OnInit, OnDestroy {
	/* Private variable */
	/* Angular Animation */
	private aPanelState : string = 'open';
	private aItemPanelState : string = 'close';

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'manager', 'open']) managerOpen$ : Observable<boolean>;
	private managerOpen : boolean;
	@select(['editor', 'manager', 'workshop']) workshop$ : Observable<boolean>;
	@select(['editor', 'manager', 'workstate']) workstate$ : Observable<boolean>;
	@select(['editor', 'manager', 'texture']) texture$ : Observable<boolean>;

	constructor (private ngRedux : NgRedux<any>,
						 	 private editorActions : EditorActions,
						 	 private modalActions : ModalActions,
						 	 private logger : LoggerService) {
	}
	ngOnInit () {
		this.subscription.push(this.managerOpen$.subscribe((data) => {
			this.aPanelState = data ? 'open' : 'close';
			this.managerOpen = data;
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	/**
	 * Angular Animation
	 * aTogglePanelStarted - событие, отслеживающее начало анимации 'togglePanel'.
	 *
	 * @kind {event}
	 * @param  {any} event
	 * @return {type}
	 */
	aTogglePanelStarted (event : any) {
		this.aItemPanelState = 'close';
		this.logger.info(`${this.constructor.name}:`, `aTogglePanelStarted - ${event.toState}`);
	}
	/**
	 * Angular Animation
	 * aTogglePanelDone - событие, отслеживающее завершение анимации 'togglePanel'.
	 *
	 * @kind {event}
	 * @param  {any} event
	 * @return {type}
	 */
	aTogglePanelDone (event : any) {
		this.aItemPanelState = 'open';
	}

	/**
	 * onClickOpenPanel - событие, отвечающее за переключение 'Manager' панелей.
	 *
	 * @kind {event}
	 * @param  {MouseEvent} event
	 * @return {type}
	 */
	onClickOpenPanel (event : MouseEvent) {
		let el : any = (<HTMLElement>event.target).closest('.item-navigation');
		if (el !== null) {
			let panelName : string = el.getAttribute('data-panel-name').toString();
			this.logger.info(`${this.constructor.name}:`, 'openPanel -', panelName);
			this.ngRedux.dispatch(this.editorActions.openManagerPanel(panelName));
		}	else {
			this.logger.info(`${this.constructor.name}:`, 'openPanel - Not navigation element');
		}
	}
}
