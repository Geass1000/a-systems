import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../actions/editor.actions';

import { LoggerService } from '../../../core/logger.service';

import { Workspace } from '../../../shared/lib/workspace.class';

@Component({
	moduleId: module.id,
  selector: 'as-editor-manager-dispatcher',
	templateUrl: 'dispatcher.component.html',
  styleUrls: [ 'dispatcher.component.css' ]
})
export class DispatcherComponent implements OnInit, OnDestroy {
	/* Private Variable */

	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['editor', 'project', 'workspace']) workspace$ : Observable<Workspace>;
	private workspace : Workspace;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
							 private logger : LoggerService) {
	}
	ngOnInit () {
		this.subscription.push(this.workspace$.subscribe((data) => {
 			this.workspace = data;
 		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}
}
