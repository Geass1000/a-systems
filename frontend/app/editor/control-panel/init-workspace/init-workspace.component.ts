import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../actions/editor.actions';
import { ModalActions } from '../../../actions/modal.actions';

import { Config } from '../../../config';
import * as _ from 'lodash';

import { LoggerService } from '../../../core/logger.service';
import { MetricService } from '../../metric.service';

import { IWorkspace } from '../../../shared/interfaces/editor.interface';

@Component({
	moduleId: module.id,
  selector: 'as-editor-init-workspace',
	templateUrl: 'init-workspace.component.html',
  styleUrls: [ 'init-workspace.component.css' ]
})
export class InitWorkspaceComponent implements OnInit, OnDestroy {
	/* Private Variable */
	private workspace : IWorkspace = null;
	private projectName : string = null;

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'all', 'isActiveMetric']) isActiveMetric$ : Observable<boolean>;
	private isActiveMetric : boolean = null;

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
					this.projectName = Config.projectName;
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
		// Del
		this.onInitWorkspace();
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

	onInitWorkspace () {
		this.prepareData();
		let resultWorkspace : IWorkspace = {
			width : this.metricService.convertFromCurToDef(this.workspace.width),
			height : this.metricService.convertFromCurToDef(this.workspace.height),
			texture : null
		};
		this.ngRedux.dispatch(this.editorActions.updateProjectName(this.projectName));
		this.ngRedux.dispatch(this.editorActions.updateWorkspace(resultWorkspace));
		this.ngRedux.dispatch(this.editorActions.closeActiveControlModal());
		this.ngRedux.dispatch(this.editorActions.initWorkspace(true));
	}

	onOpenWorkspace (el ?: boolean) {
		this.prepareData();
		console.log(this.workspace);
	}

	closeModal () {
		this.ngRedux.dispatch(this.editorActions.closeActiveControlModal());
	}
}
