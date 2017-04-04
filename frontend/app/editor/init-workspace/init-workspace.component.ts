import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';

import { IWorkspace } from '../../shared/interfaces/editor.interface';
import { Metric, Measure } from '../metric.class';

@Component({
	moduleId: module.id,
  selector: 'as-editor-init-workspace',
	templateUrl: 'init-workspace.component.html',
  styleUrls: [ 'init-workspace.component.css' ]
})
export class InitWorkspaceComponent implements OnInit, OnDestroy {
	title = 'Home';
	private selectedMetric : string = 'cm';
	private prevMetric : string = this.selectedMetric;

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
		this.subscription.push(this.workspace$.subscribe((data) => {
			this.workspace = Object.assign({}, data);
			this.workspace.width = Metric.convert({ from : Measure.px, to : Measure[this.selectedMetric] }, this.workspace.width);
			this.workspace.height = Metric.convert({ from : Measure.px, to : Measure[this.selectedMetric] }, this.workspace.height);
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	onInitWorkspace () {
		let obj : IWorkspace = Object.assign({}, this.workspace);
		obj.width  = Metric.convert({ from : Measure[this.selectedMetric], to : Measure.px }, this.workspace.width);
		obj.height = Metric.convert({ from : Measure[this.selectedMetric], to : Measure.px }, this.workspace.height);
		this.ngRedux.dispatch(this.editorActions.updateWorkspace(obj));
		this.ngRedux.dispatch(this.editorActions.initWorkspace(true));
	}

	onOpenWorkspace () {
		let num : number = Metric.convert({ from : Measure.px, to : Measure.m }, this.workspace.width);
		console.log(Measure.px);
		console.log(Measure.px.toString());
		console.log(Measure['px']);
		console.log(num);
	}

	metricChange () {
		this.workspace.width = Metric.convert({ from : Measure[this.prevMetric], to : Measure[this.selectedMetric] }, this.workspace.width);
		this.workspace.height = Metric.convert({ from : Measure[this.prevMetric], to : Measure[this.selectedMetric] }, this.workspace.height);
		this.prevMetric = this.selectedMetric;
	}

	test (event : any) {
		console.log("test");
		console.log(event);
	}
}
