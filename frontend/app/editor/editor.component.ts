import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../actions/editor.actions';

import { LoggerService } from '../core/logger.service';

import { Workspace } from '../shared/lib/workspace.class';

@Component({
	moduleId: module.id,
  selector: 'as-editor',
	templateUrl: 'editor.component.html',
  styleUrls: [ 'editor.component.css' ]
})
export class EditorComponent implements OnInit, OnDestroy {
	private loc : string = '';

	private subscription : any[] = [];
	@select(['editor', 'state', 'isInitProject']) isInitProject$ : Observable<boolean>;
	private isInitProject : boolean;
	@select(['editor', 'state', 'isMove']) isMove$ : Observable<boolean>;
	@select(['editor', 'project', 'workspace']) workspace$ : Observable<Workspace>;
	private workspace : Workspace;

	@select(['editor', 'control', 'open']) modalOpen$ : Observable<boolean>;

	constructor (private ngRedux : NgRedux<any>,
						 	 private editorActions : EditorActions,
						 	 private logger : LoggerService) {
		this.loc = location.href;
	}
	ngOnInit () {
		this.subscription.push(this.isInitProject$.subscribe((data) => this.isInitProject = data));
		this.subscription.push(this.workspace$.subscribe((data) => {
			this.workspace = data;
			this.logger.info(`${this.constructor.name}:`, 'ngOnInit - Redux - workspace -', this.workspace);
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}
}
