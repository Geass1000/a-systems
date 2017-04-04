import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';

import { IWorkspace } from '../../shared/interfaces/editor.interface';

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
	@select(['editor', 'selectElement']) selectElement$ : Observable<boolean>;
	private selectElement : boolean;
	@select(['editor', 'workspace']) workspace$ : Observable<IWorkspace>;
	private workspace : IWorkspace;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions) {
	}
	ngOnInit () {
		this.subscription.push(this.selectElement$.subscribe((data) => this.selectElement = data));
		this.subscription.push(this.workspace$.subscribe((data) => this.workspace = data));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}
}
