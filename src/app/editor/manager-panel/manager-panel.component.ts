import { Component, OnInit, OnDestroy } from '@angular/core';

/* App Redux and Request */
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';
import { ModalActions } from '../../actions/modal.actions';

/* App Services */
import { LoggerService } from '../../core/logger.service';

@Component({
	moduleId: module.id,
  selector: 'as-editor-manager-panel',
	templateUrl: 'manager-panel.component.html',
  styleUrls: [ 'manager-panel.component.scss' ]
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

	/* Private variable */
	public workshop : boolean;
	public workstate : boolean;
	public material : boolean;
	public dispatcher : boolean;

	constructor (private ngRedux : NgRedux<any>,
						 	 private editorActions : EditorActions,
						 	 private modalActions : ModalActions,
						 	 private logger : LoggerService) {
	}
	ngOnInit () {
		this.subscription.push(this.workshop$.subscribe((data) => { this.workshop = data; }));
		this.subscription.push(this.workstate$.subscribe((data) => { this.workstate = data; }));
		this.subscription.push(this.material$.subscribe((data) => { this.material = data; }));
		this.subscription.push(this.dispatcher$.subscribe((data) => { this.dispatcher = data; }));
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
		const methodName : string = 'onClickOpenPanel';
		const el : any = (<HTMLElement>event.target).closest('.item-navigation');
		if (!el) {
			this.logger.info(`${this.constructor.name} - ${methodName}:`, 'Not navigation element');
			return;
		}
		const panelName : string = el.getAttribute('data-panel-name').toString();
		this.logger.info(`${this.constructor.name} - ${methodName}:`, 'panelName -', panelName);
		this.ngRedux.dispatch(this.editorActions.openManagerPanel(panelName));
	}
}
