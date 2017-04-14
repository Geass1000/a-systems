import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';
import { ModalActions } from '../../actions/modal.actions';

import { LoggerService } from '../../core/logger.service';

@Component({
	moduleId: module.id,
  selector: 'as-editor-manager',
	templateUrl: 'manager.component.html',
  styleUrls: [ 'manager.component.css' ]
})
export class ManagerComponent implements OnInit, OnDestroy {
	/* Private variable */

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
		this.subscription.push(this.managerOpen$.subscribe((data) => this.managerOpen = data));
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
