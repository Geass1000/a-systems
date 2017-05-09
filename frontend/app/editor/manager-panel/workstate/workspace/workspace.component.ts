import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../../actions/editor.actions';

import { LoggerService } from '../../../../core/logger.service';
import { MetricService } from '../../../metric.service';

import { Workspace } from '../../../../shared/lib/workspace.class';
import { EditorForm } from '../../../../shared/lib/editor-form.class';
import { isNumber } from '../../../../shared/validators/is-number.validator';

@Component({
	moduleId: module.id,
  selector: 'as-editor-manager-workstate-workspace',
	templateUrl: 'workspace.component.html',
  styleUrls: [ 'workspace.component.css' ]
})
export class WorkspaceComponent implements OnInit, OnDestroy {
	/* Private Variable */
	private form : FormGroup;
	private editorForm : EditorForm;

	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['editor', 'state', 'isActiveMetric']) isActiveMetric$ : Observable<boolean>;
	private isActiveMetric : boolean = null;
	@select(['editor', 'project', 'workspace']) workspace$ : Observable<Workspace>;
	private workspace : Workspace = null;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private logger : LoggerService,
						 	 private metricService : MetricService,
						 	 private fb : FormBuilder) {
	}
	ngOnInit () {
		this.buildForm();
		this.subscription.push(this.workspace$.subscribe((data) => {
			this.workspace = data;
			this.editorForm.setModel(this.setModel.bind(this));
		}));
		this.subscription.push(this.isActiveMetric$.subscribe((data) => {
			this.isActiveMetric = data;
			this.editorForm.updateModel(this.updateModel.bind(this));
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	/**
	 * buildForm - функция, выполняющая создание формы и/или регистрацию на событие
	 * изменения данных.
	 *
	 * @kind {function}
	 * @return {void}
	 */
	buildForm () : void {
		this.form = this.fb.group({
			'width' : [ '', [ Validators.required,	isNumber ] ],
			'height' : [ '', [ Validators.required, isNumber ] ]
		});

		this.editorForm = new EditorForm(this.form);
		let sub = this.editorForm.subscribeValueChanges(this.onChangeValue.bind(this));
		this.subscription.push(sub);
	}

	/**
	 * setModel - функция, синхронизирующая значения формы со значениями модели из
	 * хранилища. Возвращает истину, если синхронизация произошла успешно.
	 *
	 * @kind {function}
	 * @return {boolean}
	 */
	setModel () : boolean {
		if (!this.workspace || !this.isActiveMetric) {
			return false;
		}
		this.logger.info(`${this.constructor.name}:`, 'setModel');
		this.form.setValue({
			width : this.metricService.convertFromDefToCur(this.workspace.width).toString(),
			height : this.metricService.convertFromDefToCur(this.workspace.height).toString()
		});
		return true;
	}

	/**
	 * updateModel - функция, обновляющая значения полей в случае изменения
	 * величины измерения.
	 *
	 * @kind {function}
	 * @return {void}
	 */
	updateModel () : void {
		if (!this.isActiveMetric) {
			return ;
		}
		this.logger.info(`${this.constructor.name}:`, 'updateModel');
		this.metricService.updateFormValueToCurMetric(this.form, 'width');
		this.metricService.updateFormValueToCurMetric(this.form, 'height');
	}

	/**
	 * onChangeValue - событе, отвечающее за обновление данных в Redux.
	 *
	 * @kind {event}
	 * @return {void}
	 */
	onChangeValue () : void {
		if (!this.workspace || !this.isActiveMetric) {
			return;
		}
		this.logger.info(`${this.constructor.name}:`, 'onChangeValue');
		let resultWorkspace : Workspace = new Workspace(this.workspace);

		let tmpWidth : number = this.metricService.getNumberFieldValueToDefMetric(this.form, 'width');
		resultWorkspace.width = tmpWidth !== null ? tmpWidth : resultWorkspace.width;
		let tmpHeight : number = this.metricService.getNumberFieldValueToDefMetric(this.form, 'height');
		resultWorkspace.height = tmpHeight !== null ? tmpHeight : resultWorkspace.height;

		this.ngRedux.dispatch(this.editorActions.setWorkspace(resultWorkspace));
	}

	/**
	 * getFormField - функция, возвращающая значение поля.
	 *
	 * @kind {function}
	 * @param {string} fieldName - наименование поля
	 * @return {string}
	 */
	getFormField (fieldName : string) : string {
		let field : string = this.metricService.getFieldValue(this.form, fieldName);
		return field ? field : '';
	}

	/**
	 * onClickOpenMaterial - событие, отвечающее за вызов текстурного компонента.
	 *
	 * @kind {event}
	 * @return {void}
	 */
	onClickOpenMaterial () : void {
		this.ngRedux.dispatch(this.editorActions.openManagerPanel('material'));
	}
}
