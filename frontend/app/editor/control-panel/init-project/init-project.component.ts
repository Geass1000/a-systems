import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../actions/editor.actions';
import { ModalActions } from '../../../actions/modal.actions';

import { Config } from '../../../config';

import { LoggerService } from '../../../core/logger.service';
import { MetricService } from '../../metric.service';
import { DataLoadService } from '../../data-load.service';

import { Workspace } from '../../../shared/lib/workspace.class';

@Component({
	moduleId: module.id,
  selector: 'as-editor-init-project',
	templateUrl: 'init-project.component.html',
  styleUrls: [ 'init-project.component.css' ]
})
export class InitProjectComponent implements OnInit, OnDestroy {
	/* Private Variable */
	private workspace : Workspace = null;
	private projectName : string = null;

	/* Redux */
	private subscription : any[] = [];
	@select(['modal', 'initProject']) modalOpen : any;
	@select(['editor', 'state', 'isActiveMetric']) isActiveMetric$ : Observable<boolean>;
	private isActiveMetric : boolean = null;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private modalActions : ModalActions,
						 	 private logger : LoggerService,
						 	 private metricService : MetricService,
						 	 private dataLoadService : DataLoadService) {
	}
	ngOnInit () {
		this.subscription.push(this.isActiveMetric$.subscribe((data) => {
			this.isActiveMetric = data;
			if (this.isActiveMetric) {
				if (!this.workspace) {
					this.workspace = new Workspace(Config.workspace);
					this.projectName = Config.projectName;
					this.workspace.width = this.metricService.convertFromDefToCur(this.workspace.width);
					this.workspace.height = this.metricService.convertFromDefToCur(this.workspace.height);
				} else {
					this.workspace.width = this.metricService.convertFromPrevToCur(this.workspace.width);
					this.workspace.height = this.metricService.convertFromPrevToCur(this.workspace.height);
				}
			}
			this.logger.info(`${this.constructor.name}:`, 'ngOnInit - Redux - isActiveMetric -', this.isActiveMetric);
		}));
		//this.onInitProject();
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	onInitProject () {
		let resultWorkspace : Workspace = new Workspace({
			width : this.metricService.convertFromCurToDef(this.workspace.width),
			height : this.metricService.convertFromCurToDef(this.workspace.height),
			texture : null
		});
		this.ngRedux.dispatch(this.editorActions.updateProjectName(this.projectName));
		this.ngRedux.dispatch(this.editorActions.updateWorkspace(resultWorkspace));
		this.ngRedux.dispatch(this.modalActions.closeActiveModal());
		this.dataLoadService.getInitData();
	}

	onOpenWorkspace (el ?: boolean) {
		console.log(this.workspace);
	}

	closeModal () {
		this.ngRedux.dispatch(this.modalActions.closeActiveModal());
	}
}
