import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';
import { ModalActions } from '../../actions/modal.actions';

import { Config } from '../../config';
import * as _ from 'lodash';

import { IWorkspace } from '../../shared/interfaces/editor.interface';
import { Metric, Measure } from '../metric.class';

@Component({
	moduleId: module.id,
  selector: 'as-editor-init-workspace',
	templateUrl: 'init-workspace.component.html',
  styleUrls: [ 'init-workspace.component.css' ]
})
export class InitWorkspaceComponent implements OnInit, OnDestroy {
	/* Redux */
	private subscription : any[] = [];
	@select(['modal', 'initWorkspace']) initWorkspace$ : Observable<boolean>;
	@select(['editor', 'all', 'curMeasure']) curMeasure$ : Observable<string>;
	private curMeasure : string = null;
	@select(['editor', 'all', 'defMeasure']) defMeasure$ : Observable<string>;
	private defMeasure : string = null;

	/* Private Variable */
	private workspace : IWorkspace = null;
	private workspaceMeasure : string = null;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private modalActions : ModalActions) {
	}
	ngOnInit () {
		this.subscription.push(this.defMeasure$.subscribe((data) => this.defMeasure = data));
		this.subscription.push(this.curMeasure$.subscribe((data) => {
			this.curMeasure = data;
			if (!this.workspace) {
				this.workspace = _.cloneDeep(Config.workspace);
				this.workspaceMeasure = this.defMeasure;
			}
			this.convert();
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	convert () {
		if (this.workspace) {
			this.workspace.width  = Metric.convert({ from : Measure.get(this.workspaceMeasure), to : Measure.get(this.curMeasure) }, this.workspace.width);
			this.workspace.height = Metric.convert({ from : Measure.get(this.workspaceMeasure), to : Measure.get(this.curMeasure) }, this.workspace.height);
			this.workspaceMeasure = this.curMeasure;
		}
	}

	onInitWorkspace () {
		let obj : IWorkspace = Object.assign({}, this.workspace);
		obj.width  = Metric.convert({ from : Measure.get(this.curMeasure), to : Measure.get(this.defMeasure) }, this.workspace.width);
		obj.height = Metric.convert({ from : Measure.get(this.curMeasure), to : Measure.get(this.defMeasure) }, this.workspace.height);
		this.ngRedux.dispatch(this.editorActions.updateWorkspace(obj));
		this.ngRedux.dispatch(this.modalActions.closeActiveModal());
		this.ngRedux.dispatch(this.editorActions.initWorkspace(true));
	}

	onOpenWorkspace (el ?: boolean) {
		console.log(el);
	}
}
