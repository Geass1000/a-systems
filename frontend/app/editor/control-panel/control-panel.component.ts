import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
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
	private subscription : any[] = [];
	@select(['editor', 'state', 'curMeasure']) curMeasure$ : Observable<string>;
	private curMeasure : string;
	@select(['modal', 'initProject']) initProject$ : Observable<boolean>;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private modalActions : ModalActions,
						 	 private logger : LoggerService) {
	}
	ngOnInit () {
		this.ngRedux.dispatch(this.modalActions.openPanel('initProject'));
		this.subscription.push(this.curMeasure$.subscribe((data) => this.curMeasure = data));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}
	formChange (event : any) {
		this.ngRedux.dispatch(this.editorActions.setMeasure(this.curMeasure));
	}

	openModal (event : any) {
		let el : any = event.target.closest('.item-navigation');
		if (el !== null) {
			this.logger.info(`${this.constructor.name}:`, 'openModal -', el.dataset.modalName);
			this.ngRedux.dispatch(this.modalActions.openPanel(el.dataset.modalName));
		}	else {
			this.logger.info(`${this.constructor.name}:`, 'openModal - Not navigation element');
		}
	}
}
