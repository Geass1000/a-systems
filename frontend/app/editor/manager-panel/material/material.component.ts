import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../actions/editor.actions';

import { LoggerService } from '../../../core/logger.service';
//import { MaterialColor } from '../../../shared/lib/material-color.class';

@Component({
	moduleId: module.id,
  selector: 'as-editor-manager-material',
	templateUrl: 'material.component.html',
  styleUrls: [ 'material.component.css' ]
})
export class MaterialComponent implements OnInit, OnDestroy {
	/* Private variable */
	private activeMaterialCategory : string = '';
	private activeColorCategory : string = '';

	/* Redux */
	private subscription : Array<Subscription> = [];

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private logger : LoggerService) {
	}
	ngOnInit () {
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	/**
	 * onChangeMaterialCategory - событие, отслеживающее изменение категории материала.
	 *
	 * @kind {event}
	 * @param  {Event} event
	 * @return {type}
	 */
	onChangeMaterialCategory (event : Event) {
		this.logger.info(`${this.constructor.name} - onChangeMaterialCategory:`, this.activeMaterialCategory);
	}

	/**
	 * onChangeColorCategory - событие, отслеживающее изменение категории цветовой модели.
	 *
	 * @kind {event}
	 * @param  {Event} event
	 * @return {type}
	 */
	onChangeColorCategory (event : Event) {
		this.logger.info(`${this.constructor.name} - onChangeMaterialCategory:`, this.activeMaterialCategory);
	}

	/**
	 * onClickBack - событие, отвечающее за переход в панель 'Workstate'.
	 *
	 * @kind {event}
	 * @return {type}
	 */
	onClickBack () {
		this.ngRedux.dispatch(this.editorActions.openManagerPanel('workstate'));
	}
}
