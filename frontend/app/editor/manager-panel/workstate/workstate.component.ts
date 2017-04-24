import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../actions/editor.actions';

import { LoggerService } from '../../../core/logger.service';
import { MetricService } from '../../metric.service';

import { IWorkspace } from '../../../shared/interfaces/editor.interface';

@Component({
	moduleId: module.id,
  selector: 'as-editor-manager-workstate',
	templateUrl: 'workstate.component.html',
  styleUrls: [ 'workstate.component.css' ]
})
export class WorkstateComponent implements OnInit, OnDestroy {
	title = 'Home';

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'project', 'workspace']) workspace$ : Observable<IWorkspace>;
	private workspace : IWorkspace;
	@select(['editor', 'all', 'isActiveMetric']) isActiveMetric$ : Observable<boolean>;
	private isActiveMetric : boolean = null;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private logger : LoggerService,
						 	 private metricService : MetricService) {
	}
	ngOnInit () {
		this.subscription.push(this.workspace$.subscribe((data) => {
			this.workspace = Object.assign({}, data);
			if (this.isActiveMetric) {
				this.prepareData();
				this.workspace.width = this.metricService.convertFromDefToCur(this.workspace.width);
				this.workspace.height = this.metricService.convertFromDefToCur(this.workspace.height);
			}
		}));
		this.subscription.push(this.isActiveMetric$.subscribe((data) => {
			this.isActiveMetric = data;
			if (this.isActiveMetric) {
				if (!this.workspace) {
					this.prepareData();
					this.workspace.width = this.metricService.convertFromDefToCur(this.workspace.width);
					this.workspace.height = this.metricService.convertFromDefToCur(this.workspace.height);
				} else {
					this.prepareData();
					this.workspace.width = this.metricService.convertFromPrevToCur(this.workspace.width);
					this.workspace.height = this.metricService.convertFromPrevToCur(this.workspace.height);
				}
			}
			this.logger.info(`${this.constructor.name}:`, 'ngOnInit - Redux - isActiveMetric -', this.isActiveMetric);
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	prepareData () {
		if (this.workspace) {
			this.workspace.width = this.toNumber(this.workspace.width);
			this.workspace.height = this.toNumber(this.workspace.height);
		}
	}
	toNumber (data : any) {
		if (isFinite(+data)) {
			return +data;
		}
		return data;
	}
}
