import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';
import { ModalActions } from '../../actions/modal.actions';

import { LoggerService } from '../../core/logger.service';

@Component({
	moduleId: module.id,
  selector: 'as-editor-manager',
	templateUrl: 'manager.component.html',
  styleUrls: [ 'manager.component.css' ],
	animations: [
		trigger('flyInOut', [
			state('close', style({
				transform: 'translateX(0)',
				opacity: '1'
			})),
			state('open', style({
				transform: 'translateX(0)',
				opacity: '1'
			})),
			transition('void => open', [
				style({
					transform: 'translateX(-100%)',
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
		])
	]
})
export class ManagerComponent implements OnInit, OnDestroy {
	/* Private variable */
	private panelState : string = 'open';

	/* Input */

	/* Output */

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'manager', 'open']) managerOpen$ : Observable<boolean>;
	private managerOpen : boolean;
	@select(['editor', 'manager', 'workshop']) workshop$ : Observable<boolean>;
	private workshop : boolean;
	@select(['editor', 'manager', 'workstate']) workstate$ : Observable<boolean>;
	private workstate : boolean;

	constructor (private ngRedux : NgRedux<any>,
						 	 private editorActions : EditorActions,
						 	 private modalActions : ModalActions,
						 	 private logger : LoggerService) {
	}
	ngOnInit () {
		this.subscription.push(this.managerOpen$.subscribe((data) => {
			this.managerOpen = data;
		}));
		this.subscription.push(this.workshop$.subscribe((data) => this.workshop = data));
		this.subscription.push(this.workstate$.subscribe((data) => this.workstate = data));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}
	openPanel (event : any) {
		let el : any = event.target.closest('.item-navigation');
		if (el !== null) {
			this.logger.info(`${this.constructor.name}:`, 'openPanel -', el.dataset.panelName);
			this.ngRedux.dispatch(this.editorActions.openManagerPanel(el.dataset.panelName));
		}
		else {
			this.logger.info(`${this.constructor.name}:`, 'openPanel - Not navigation element');
		}
	}
}