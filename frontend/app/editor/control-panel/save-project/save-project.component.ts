import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../actions/editor.actions';
import { ModalActions } from '../../../actions/modal.actions';

import { LoggerService } from '../../../core/logger.service';
import { ProjectService } from '../../../core/project.service';

import { IProject, IRProjectsSave } from '../../../shared/interfaces/project.interface';
import { IWorkspace } from '../../../shared/lib/workspace.class';
import { ISurface } from '../../../shared/lib/surface.class';
import { IThing } from '../../../shared/lib/thing.class';

@Component({
	moduleId: module.id,
  selector: 'as-editor-control-save-project',
	templateUrl: 'save-project.component.html',
  styleUrls: [ 'save-project.component.css' ]
})
export class SaveProjectComponent implements OnInit, OnDestroy {
	/* Private Variable */
	private isSave : boolean;

	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['editor', 'project']) project$ : Observable<IProject>;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private modalActions : ModalActions,
						 	 private logger : LoggerService,
						 	 private projectService : ProjectService) {
	}
	ngOnInit () {
		this.isSave = false;
		this.subscription.push(this.project$.subscribe((data) => {
			if (!this.isSave) {
				this.isSave = true;
				this.saveProject(data);
			}
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	/**
	 * onClickCloseModal - функция-событие, выполняет закрытие модального окна.
	 *
	 * @kind {event}
	 * @return {void}
	 */
	saveProject (project : IProject) : void {
		if (!project) {
			return;
		}
		let result : IProject = {
			_id : project._id,
			_uid : project._uid,
			name : project.name,
			workspace : <IWorkspace>project.workspace.valueOf(),
			surfaces : <Array<ISurface>>project.surfaces.map((data) => data.valueOf()),
			things : <Array<IThing>>project.things.map((data) => data.valueOf())
		};
		this.logger.info(`${this.constructor.name} - saveProject:`, 'result - ', result);
		if (project._id) {
			this.projectService.putProject(project._id, result).subscribe((data : IRProjectsSave) => {
				this.logger.info(`${this.constructor.name} - saveProject:`, 'Update', 'data - ', data);
				this.ngRedux.dispatch(this.editorActions.saveProject(data.project));
				this.ngRedux.dispatch(this.modalActions.closeActiveModal());
			});
		} else {
			this.projectService.postProject(result).subscribe((data : IRProjectsSave) => {
				this.logger.info(`${this.constructor.name} - saveProject:`, 'Add', 'data - ', data);
				this.ngRedux.dispatch(this.editorActions.saveProject(data.project));
				this.ngRedux.dispatch(this.modalActions.closeActiveModal());
			});
		}
	}
}
