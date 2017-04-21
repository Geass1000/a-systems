import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';
import { ModalActions } from '../../actions/modal.actions';

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
	@select(['editor', 'all', 'curMeasure']) curMeasure$ : Observable<string>;
	private curMeasure : string;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private modalActions : ModalActions) {
	}
	openModalInitWorkspace () {
		this.ngRedux.dispatch(this.modalActions.openModal('initWorkspace', false));
	}
	ngOnInit () {
		this.subscription.push(this.curMeasure$.subscribe((data) => this.curMeasure = data));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}
	formChange (event : any) {
		this.ngRedux.dispatch(this.editorActions.setMeasure(this.curMeasure));
	}
}
