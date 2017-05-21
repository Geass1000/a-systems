import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../actions/editor.actions';
import { ModalActions } from '../../../actions/modal.actions';

import { LoggerService } from '../../../core/logger.service';

import { IProject } from '../../../shared/interfaces/project.interface';

@Component({
	moduleId: module.id,
  selector: 'as-editor-control-save-project',
	templateUrl: 'save-project.component.html',
  styleUrls: [ 'save-project.component.css' ]
})
export class SaveProjectComponent implements OnInit, OnDestroy {
	/* Private Variable */

	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['editor', 'project']) project$ : Observable<boolean>;
	private project : IProject;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private modalActions : ModalActions,
						 	 private logger : LoggerService) {
	}
	ngOnInit () {
		this.subscription.push(this.project$.subscribe((data) => {
			this.logger.info(`${this.constructor.name} - ngOnInit:`, 'data - ', data);
			this.ngRedux.dispatch(this.modalActions.closeActiveModal());
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
	onClickCloseModal () : void {
		this.ngRedux.dispatch(this.modalActions.closeActiveModal());
	}
}
