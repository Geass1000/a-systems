import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';
import { ModalActions } from '../../actions/modal.actions';

import { LoggerService } from '../../core/logger.service';

@Component({
	moduleId: module.id,
  selector: 'as-editor-manager-panel',
	templateUrl: 'manager-panel.component.html',
  styleUrls: [ 'manager-panel.component.css' ]
})
export class ManagerPanelComponent implements OnInit, OnDestroy {
	/* Private variable */

	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['editor', 'manager', 'open']) managerOpen$ : Observable<boolean>;
	@select(['editor', 'manager', 'workshop']) workshop$ : Observable<boolean>;
	@select(['editor', 'manager', 'workstate']) workstate$ : Observable<boolean>;
	@select(['editor', 'manager', 'material']) material$ : Observable<boolean>;
	@select(['editor', 'manager', 'dispatcher']) dispatcher$ : Observable<boolean>;

	constructor (private ngRedux : NgRedux<any>,
						 	 private editorActions : EditorActions,
						 	 private modalActions : ModalActions,
						 	 private logger : LoggerService) {
	}
	ngOnInit () {
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	/**
	 * onClickOpenPanel - событие, отвечающее за переключение 'Manager' панелей.
	 *
	 * @kind {event}
	 * @param  {MouseEvent} event
	 * @return {void}
	 */
	onClickOpenPanel (event : MouseEvent) : void {
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
