import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';
import { ModalActions } from '../../actions/modal.actions';

import { LoggerService } from '../../core/logger.service';

@Component({
	moduleId: module.id,
  selector: 'as-editor-control-panel',
	templateUrl: 'control-panel.component.html',
  styleUrls: [ 'control-panel.component.css' ]
})
export class ControlPanelComponent implements OnInit, OnDestroy {
	title = 'Home';

	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['editor', 'state', 'curMeasure']) curMeasure$ : Observable<string>;
	private curMeasure : string;
	@select(['modal', 'initProject']) initProject$ : Observable<boolean>;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private modalActions : ModalActions,
						 	 private logger : LoggerService) {
	}
	ngOnInit () {
		this.subscription.push(this.curMeasure$.subscribe((data) => this.curMeasure = data));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	/**
	 * onChangeMeasure - событие, отвечающее за изменение активной единицы измерения.
	 *
	 * @kind {event}
	 * @return {void}
	 */
	onChangeMeasure () : void {
		this.ngRedux.dispatch(this.editorActions.setMeasure(this.curMeasure));
	}

	/**
	 * onClickOpenModal - событие, отвечающее за открытие 'Control' модельных окон.
	 *
	 * @kind {event}
	 * @param  {MouseEvent} event
	 * @return {void}
	 */
	onClickOpenModal (event : MouseEvent) : void {
		let el : any = (<HTMLElement>event.target).closest('.item-navigation');
		if (el !== null) {
			let modalName : string = el.getAttribute('data-modal-name').toString();
			this.logger.info(`${this.constructor.name}:`, 'openModal -', modalName);
			this.ngRedux.dispatch(this.modalActions.openPanel(modalName));
		}	else {
			this.logger.info(`${this.constructor.name}:`, 'openModal - Not navigation element');
		}
	}
}
