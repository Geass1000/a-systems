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
import { IModelInitProject } from '../../../shared/interfaces/model.interface';

@Component({
	moduleId: module.id,
  selector: 'as-editor-init-project',
	templateUrl: 'init-project.component.html',
  styleUrls: [ 'init-project.component.css' ]
})
export class InitProjectComponent implements OnInit, OnDestroy {
	/* Private Variable */
	private model : IModelInitProject = null;

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
				if (!this.model) {
					this.model = {
						name : Config.projectName,
						width : this.metricService.convertFromDefToCur(Config.workspace.width).toString(),
						height : this.metricService.convertFromDefToCur(Config.workspace.width).toString()
					};
				} else {
					this.model.width = this.metricService.convertFromPrevToCur(this.model.width).toString();
					this.model.height = this.metricService.convertFromPrevToCur(this.model.height).toString();
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
		let resultWorkspace : Workspace = new Workspace();
		resultWorkspace.width = +this.metricService.convertFromCurToDef(this.model.width);
		resultWorkspace.height = +this.metricService.convertFromCurToDef(this.model.height);

		this.ngRedux.dispatch(this.editorActions.updateProjectName(this.model.height));
		this.ngRedux.dispatch(this.editorActions.updateWorkspace(resultWorkspace));
		this.ngRedux.dispatch(this.modalActions.closeActiveModal());
		this.dataLoadService.initData();
	}

	onOpenWorkspace (el ?: boolean) {
		console.log(this.model);
	}

	closeModal () {
		this.ngRedux.dispatch(this.modalActions.closeActiveModal());
	}
}
