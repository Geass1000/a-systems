import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';
import { ModalActions } from '../../actions/modal.actions';

import { Config } from '../../config';
import * as _ from 'lodash';

import { LoggerService } from '../../core/logger.service';
import { MetricService } from '../metric.service';

import { IWorkspace } from '../../shared/interfaces/editor.interface';

@Component({
	moduleId: module.id,
  selector: 'as-editor-init-workspace',
	templateUrl: 'init-workspace.component.html',
  styleUrls: [ 'init-workspace.component.css' ]
})
export class InitWorkspaceComponent implements OnInit, OnDestroy {
	/* Private Variable */

	/* Redux */
	private subscription : any[] = [];
	@select(['modal', 'initWorkspace']) initWorkspace$ : Observable<boolean>;

	@select(['editor', 'all', 'isActiveMetric']) isActiveMetric$ : Observable<boolean>;
	private isActiveMetric : boolean = null;

	/* Private Variable */
	private workspace : IWorkspace = null;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private modalActions : ModalActions,
						 	 private logger : LoggerService,
						 	 private metricService : MetricService) {
	}
	ngOnInit () {
		this.subscription.push(this.isActiveMetric$.subscribe((data) => {
			this.isActiveMetric = data;
			if (this.isActiveMetric) {
				if (!this.workspace) {
					this.workspace = _.cloneDeep(Config.workspace);
					this.workspace.width = this.metricService.convertFromDefToCur(this.workspace.width);
					this.workspace.height = this.metricService.convertFromDefToCur(this.workspace.height);
				} else {
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

	onInitWorkspace () {
		let obj : IWorkspace = Object.assign({}, this.workspace);
		obj.width  = this.metricService.convertFromCurToDef(this.workspace.width);
		obj.height = this.metricService.convertFromCurToDef(this.workspace.height);
		this.ngRedux.dispatch(this.editorActions.updateWorkspace(obj));
		this.ngRedux.dispatch(this.modalActions.closeActiveModal());
		this.ngRedux.dispatch(this.editorActions.initWorkspace(true));
	}

	onOpenWorkspace (el ?: boolean) {
		console.log(el);
	}
}
