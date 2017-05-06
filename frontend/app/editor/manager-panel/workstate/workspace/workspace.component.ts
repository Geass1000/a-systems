import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../../actions/editor.actions';

import { LoggerService } from '../../../../core/logger.service';
import { MetricService } from '../../../metric.service';

import { Workspace } from '../../../../shared/lib/workspace.class';
import { isNumber } from '../../../../shared/validators/is-number.validator';

@Component({
	moduleId: module.id,
  selector: 'as-editor-manager-workspace',
	templateUrl: 'workspace.component.html',
  styleUrls: [ 'workspace.component.css' ]
})
export class WorkspaceComponent implements OnInit, OnDestroy {
	/* Private Variable */
	private isInit : boolean = false; // флаг сигнализирующий о необходимости инициализации
	private form : FormGroup;
	private subFormChange : any;
	private changeModel : boolean; // Флаг, сигнализирующий о изменении модели
	private changeMeasure : boolean; // флаг сигнализирующий о изменении единиц измерения

	/* Redux */
	private subscription : any[] = [];
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
			this.isInit = false;
			this.setModel();
		}));
		this.subscription.push(this.isActiveMetric$.subscribe((data) => {
			this.isActiveMetric = data;
			if (this.isInit) {
				this.updateModelMetric();
			} else {
				this.setModel();
			}
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
		if (this.subFormChange) {
			this.subFormChange.unsubscribe();
		}
	}

	/**
	 * setModel - функция, синхронизирующая значения формы со значениями модели из
	 * хранилища. Не реагирует на изменение модели из данного компонента.
	 *
	 * @kind {function}
	 * @return {void}
	 */
	setModel () : void {
		if (this.changeModel) {
			this.changeModel = false;
			this.isInit = true;
			return ;
		}
		if (!this.workspace || !this.isActiveMetric) {
			return ;
		}
		this.logger.info(`${this.constructor.name}:`, 'setModel - workspace -', this.workspace);
		this.form.setValue({
			width : this.metricService.convertFromDefToCur(this.workspace.width).toString(),
			height : this.metricService.convertFromDefToCur(this.workspace.height).toString()
		});
		this.isInit = true;
	}

	/**
	 * updateModelMetric - функция, обновляющая значения полей в случае изменения
	 * величины измерения.
	 *
	 * @kind {function}
	 * @return {void}
	 */
	updateModelMetric () : void {
		this.changeMeasure = true;
		this.metricService.updateFormValue(this.form, 'width');
		this.changeMeasure = true;
		this.metricService.updateFormValue(this.form, 'height');
		//this.updateMetricValue('width');
		//this.updateMetricValue('height');
	}

	/**
	 * buildForm - функция, выполняющая создание формы.
	 *
	 * @kind {function}
	 * @return {void}
	 */
	buildForm () : void {
		if (this.subFormChange) {
			this.subFormChange.unsubscribe();
		}
		this.form = this.fb.group({
			'width' : [ '', [ Validators.required,	isNumber ] ],
			'height' : [ '', [ Validators.required, isNumber ] ]
		});

		this.subFormChange = this.form.valueChanges.subscribe((data) => this.onChangeValue(data));
	}

	/**
	 * onChangeValue - событе, отвечающее за обновление данных в Redux.
	 *
	 * @kind {event}
	 * @param {any} data - объект с данными из формы
	 * @return {void}
	 */
	onChangeValue (data ?: any) {
		if (this.changeMeasure) {
			this.changeMeasure = false;
			return;
		}
		if (!this.workspace || !this.isActiveMetric || !this.form.valid || !this.isInit) {
			return;
		}
		this.logger.info(`${this.constructor.name}:`, 'onChangeValue -', this.workspace);
		let resultWorkspace : Workspace = new Workspace(this.workspace);

		let tmpWidth : number = this.prepareNumberData('width');
		resultWorkspace.width = tmpWidth !== null ? tmpWidth : resultWorkspace.width;
		let tmpHeight : number = this.prepareNumberData('height');
		resultWorkspace.height = tmpHeight !== null ? tmpHeight : resultWorkspace.height;

		this.changeModel = true;
		this.ngRedux.dispatch(this.editorActions.setWorkspace(resultWorkspace));
	}

	/**
	 * prepareNumberData - функция, выполняющая извлечение цифровых данных из поля fieldName.
	 *
	 * @kind {function}
	 * @param {string} fieldName - наименование поля
	 * @return {void}
	 */
	prepareNumberData (fieldName : string) {
		if (!this.isActiveMetric || !this.isVailid(fieldName)) {
			return null;
		}
		return +this.metricService.convertFromCurToDef(this.getField(fieldName));
	}

	/**
	 * updateMetricValue - функция, выполняющее обновление цифрового поля 'fieldName'.
	 *
	 * @kind {function}
	 * @param {string} fieldName - наименование поля
	 * @return {void}
	 */
	updateMetricValue (fieldName : string) : void {
		if (!this.isActiveMetric || !this.isVailid(fieldName)) {
			return;
		}
		this.changeMeasure = true;
		let obj = {};
		obj[fieldName] = this.metricService.convertFromPrevToCur(this.getField(fieldName)).toString();
		this.form.patchValue(obj);
	}

	/**
	 * isVailid - функция, возвращающая истину, если палое 'fieldName' прошло валидацию.
	 *
	 * @kind {function}
	 * @param {string} fieldName - наименование поля
	 * @return {boolean}
	 */
	isVailid (fieldName : string) : boolean {
		if (!this.form) {
			return null;
		}
		let field : AbstractControl = this.form.get(fieldName);
		return field ? field.valid : false;
	}

	/**
	 * getField - функция, возвращающая значение поля.
	 *
	 * @kind {function}
	 * @param {string} fieldName - наименование поля
	 * @return {string}
	 */
	getField (fieldName : string) : string {
		if (!this.form) {
			return null;
		}
		let field : AbstractControl = this.form.get(fieldName);
		return field ? field.value.toString() : '';
	}

	/**
	 * onClickTexture - событие, отвечающее за вызов текстурного компонента.
	 *
	 * @kind {event}
	 * @return {void}
	 */
	onClickOpenTexture () : void {
		this.ngRedux.dispatch(this.editorActions.openManagerPanel('texture'));
	}

	/**
	 * onClickAccept - событие, отвечающее за форматирование и сохранение данных.
	 *
	 * @kind {event}
	 * @return {void}
	 */
	onClickAccept () : void {
		let resultWorkspace : Workspace = new Workspace(this.workspace);
		resultWorkspace.width = +this.metricService.convertFromCurToDef(this.getField('width'));
		resultWorkspace.height = +this.metricService.convertFromCurToDef(this.getField('height'));
		this.ngRedux.dispatch(this.editorActions.setWorkspace(resultWorkspace));
	}
}
