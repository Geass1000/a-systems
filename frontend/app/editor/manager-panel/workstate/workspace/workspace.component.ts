import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../../actions/editor.actions';

import { LoggerService } from '../../../../core/logger.service';
import { MetricService } from '../../../metric.service';

import { Workspace } from '../../../../shared/lib/workspace.class';
import { IModelWorkspace } from '../../../../shared/interfaces/model.interface';

@Component({
	moduleId: module.id,
  selector: 'as-editor-manager-workspace',
	templateUrl: 'workspace.component.html',
  styleUrls: [ 'workspace.component.css' ]
})
export class WorkspaceComponent implements OnInit, OnDestroy {
	/* Private Variable */
	private model : IModelWorkspace = null;
	private isInit : boolean = false;

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'state', 'isActiveMetric']) isActiveMetric$ : Observable<boolean>;
	private isActiveMetric : boolean = null;
	@select(['editor', 'project', 'workspace']) workspace$ : Observable<Workspace>;
	private workspace : Workspace = null;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private logger : LoggerService,
						 	 private metricService : MetricService) {
	}
	ngOnInit () {
		this.subscription.push(this.workspace$.subscribe((data) => {
			this.workspace = data;
			if (this.workspace) {
				this.model = {
					width : data.width.toString(),
					height : data.height.toString()
				};
				if (this.isActiveMetric) {
					this.model.width = this.metricService.convertFromDefToCur(this.model.width).toString();
					this.model.height = this.metricService.convertFromDefToCur(this.model.height).toString();
					this.isInit = true;
				}
			}
			this.logger.info(`${this.constructor.name}:`, 'ngOnInit - Redux - workspace -', data);
		}));
		this.subscription.push(this.isActiveMetric$.subscribe((data) => {
			this.isActiveMetric = data;
			if (this.isActiveMetric) {
				if (this.isInit) {
					this.model.width = this.metricService.convertFromPrevToCur(this.model.width).toString();
					this.model.height = this.metricService.convertFromPrevToCur(this.model.height).toString();
				} else if (this.model) {
					this.model.width = this.metricService.convertFromDefToCur(this.model.width).toString();
					this.model.height = this.metricService.convertFromDefToCur(this.model.height).toString();
					this.isInit = true;
				}
			}
			this.logger.info(`${this.constructor.name}:`, 'ngOnInit - Redux - isActiveMetric -', this.isActiveMetric);
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	/**
	 * onClickTexture - событие, отвечающее за вызов текстурного компонента.
	 *
	 * @kind {event}
	 * @return {type}
	 */
	onClickTexture () {
		this.ngRedux.dispatch(this.editorActions.openManagerPanel('texture'));
	}

	/**
	 * onClickAccept - событие, отвечающее за форматирование и сохранение данных.
	 *
	 * @kind {event}
	 * @return {type}
	 */
	onClickAccept () {
		let resultWorkspace : Workspace = new Workspace(this.workspace);
		resultWorkspace.width = +this.metricService.convertFromCurToDef(this.model.width);
		resultWorkspace.height = +this.metricService.convertFromCurToDef(this.model.height);
		this.ngRedux.dispatch(this.editorActions.setWorkspace(resultWorkspace));
	}
}
