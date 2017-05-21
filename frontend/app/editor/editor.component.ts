import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../actions/editor.actions';
import { ModalActions } from '../actions/modal.actions';

import { LoggerService } from '../core/logger.service';
import { DataInitService } from './data-init.service';

import { Workspace } from '../shared/lib/workspace.class';

@Component({
	moduleId: module.id,
  selector: 'as-editor',
	templateUrl: 'editor.component.html',
  styleUrls: [ 'editor.component.css' ]
})
export class EditorComponent implements OnInit, OnDestroy {
	private loc : string = '';

	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['editor', 'state', 'isInitProject']) isInitProject$ : Observable<boolean>;
	private isInitProject : boolean;
	@select(['editor', 'state', 'isMove']) isMove$ : Observable<boolean>;
	@select(['editor', 'project', 'workspace']) workspace$ : Observable<Workspace>;
	private workspace : Workspace;
	@select(['editor', 'project', '_id']) _id$ : Observable<Workspace>;
	@select(['editor', 'control', 'open']) modalOpen$ : Observable<boolean>;

	constructor (private ngRedux : NgRedux<any>,
						 	 private editorActions : EditorActions,
							 private modalActions : ModalActions,
						 	 private logger : LoggerService,
						 	 private dataInitService : DataInitService) {
		this.loc = location.href;
	}
	ngOnInit () {
		this.subscription.push(this._id$.subscribe((data) => {
			this.ngRedux.dispatch(this.modalActions.closeActiveModal());
			if (!data) {
				this.ngRedux.dispatch(this.modalActions.openPanel('initProject', false));
			} else {
				this.dataInitService.initData();
			}
		}));
		this.subscription.push(this.isInitProject$.subscribe((data) => this.isInitProject = data));
		this.subscription.push(this.workspace$.subscribe((data) => {
			this.workspace = data;
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}
}
