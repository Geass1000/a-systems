import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../actions/editor.actions';

import { IWorkspace } from '../../../shared/interfaces/editor.interface';

@Component({
	moduleId: module.id,
  selector: 'as-editor-manager-workshop',
	templateUrl: 'workshop.component.html',
  styleUrls: [ 'workshop.component.css' ]
})
export class WorkshopComponent implements OnInit, OnDestroy {
	title = 'Home';

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'all', 'selectElement']) selectElement$ : Observable<boolean>;
	private selectElement : boolean;
	@select(['editor', 'all', 'workspace']) workspace$ : Observable<IWorkspace>;
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
