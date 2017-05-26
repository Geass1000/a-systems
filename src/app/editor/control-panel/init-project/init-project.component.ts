import { Component, OnInit, OnDestroy } from '@angular/core';

import { Config } from '../../../config';

/* App Redux and Request */
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../actions/editor.actions';
import { ModalActions } from '../../../actions/modal.actions';

/* App Services */
import { LoggerService } from '../../../core/logger.service';
import { MetricService } from '../../metric.service';
import { DataInitService } from '../../data-init.service';

/* App Interfaces and Classes */
import { Workspace } from '../../../shared/lib/workspace.class';
import { IModelInitProject } from '../../../shared/interfaces/model.interface';

@Component({
	moduleId: module.id,
  selector: 'as-editor-control-init-project',
	templateUrl: 'init-project.component.html',
  styleUrls: [ 'init-project.component.scss' ]
})
export class InitProjectComponent implements OnInit, OnDestroy {
	/* Private Variable */

	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['modal', 'initProject']) modalOpen : any;
	@select(['editor', 'state', 'isActiveMetric']) isActiveMetric$ : Observable<boolean>;
	private isActiveMetric : boolean = null;

	/* Public Variable */
	public model : IModelInitProject = null;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private modalActions : ModalActions,
						 	 private logger : LoggerService,
						 	 private metricService : MetricService,
						 	 private dataInitService : DataInitService) {
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
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	/**
	 * onClickInitProject - функция-событие, выполняет создание проекта.
	 *
	 * @kind {event}
	 * @return {void}
	 */
	onClickCreateProject () : void {
		const resultWorkspace : Workspace = new Workspace();
		resultWorkspace.width = +this.metricService.convertFromCurToDef(this.model.width);
		resultWorkspace.height = +this.metricService.convertFromCurToDef(this.model.height);

		this.ngRedux.dispatch(this.editorActions.resetProject());
		this.ngRedux.dispatch(this.editorActions.updateProjectName(this.model.name));
		this.ngRedux.dispatch(this.editorActions.setWorkspace(resultWorkspace));
		this.dataInitService.initData();
		this.ngRedux.dispatch(this.modalActions.closeActiveModal());
	}

	/**
	 * onClickOpenWorkspace - функция-событие, выполняет открытие проекта из файла.
	 *
	 * @kind {event}
	 * @return {void}
	 */
	onClickOpenWorkspace () : void {
		console.log(this.model);
	}

	/**
	 * onClickCloseModal - функция-событие, выполняет закрытие модального окна.
	 *
	 * @kind {event}
	 * @return {void}
	 */
	onClickCloseModal () : void {
		this.ngRedux.dispatch(this.modalActions.closeActiveModal());
	}
}
