import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';

import { IWorkspace } from '../../shared/interfaces/editor.interface';

@Component({
	moduleId: module.id,
  selector: 'as-editor-init-workspace',
	templateUrl: 'init-workspace.component.html',
  styleUrls: [ 'init-workspace.component.css' ]
})
export class InitWorkspaceComponent implements OnInit, OnDestroy {
	title = 'Home';

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'isInit']) isInit$ : Observable<boolean>;
	private isInit : boolean;
	@select(['editor', 'workspace']) workspace$ : Observable<IWorkspace>;
	private workspace : IWorkspace;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions) {
	}
	ngOnInit () {
		this.subscription.push(this.isInit$.subscribe((data) => this.isInit = data));
		this.subscription.push(this.workspace$.subscribe((data) => this.workspace = data));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	onInitWorkspace () {
		this.ngRedux.dispatch(this.editorActions.updateWorkspace(this.workspace));
		this.ngRedux.dispatch(this.editorActions.initWorkspace(true));
	}

	onOpenWorkspace () {
	}

	test (event : any) {
		console.log("test");
		console.log(event);
	}
}
