import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
	private isInit : boolean = false;
	private form : FormGroup;
	private formChangeValue : any;

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
			if (!this.isInit) {
				this.isInit = this.initForm();
			}
			this.logger.info(`${this.constructor.name}:`, 'ngOnInit - Redux - workspace -', data);
		}));
		this.subscription.push(this.isActiveMetric$.subscribe((data) => {
			this.isActiveMetric = data;
			if (this.isInit) {
				this.updateNumberValue('width');
				this.updateNumberValue('height');
			} else {
				this.isInit = this.initForm();
			}
			this.logger.info(`${this.constructor.name}:`, 'ngOnInit - Redux - isActiveMetric -', this.isActiveMetric);
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
		if (this.formChangeValue) {
			this.formChangeValue.unsubscribe();
		}
	}

	/**
	 * buildForm - функция, выполняющая создание формы.
	 *
	 * @kind {function}
	 * @return {void}
	 */
	buildForm () : void {
		if (this.formChangeValue) {
			this.formChangeValue.unsubscribe();
		}
		this.form = this.fb.group({
			'width' : [ '', [ Validators.required,	isNumber ] ],
			'height' : [ '', [ Validators.required, isNumber ] ]
		});

		this.formChangeValue = this.form.valueChanges.subscribe((data) => this.onChangeValue(data));
	}

	/**
	 * onChangeValue - событе, отвечающее за обновление данных в Redux.
	 *
	 * @kind {event}
	 * @param {any} data - объект с данными из формы
	 * @return {void}
	 */
	onChangeValue (data ?: any) {
		if (!this.workspace || !this.isActiveMetric || !this.isInit) {
			return;
		}

		let resultWorkspace : Workspace = new Workspace(this.workspace);

		let tmpWidth : number = this.prepareNumberData('width');
		resultWorkspace.width = tmpWidth ? tmpWidth : resultWorkspace.width;
		let tmpHeight : number = this.prepareNumberData('height');
		resultWorkspace.height = tmpHeight ? tmpHeight : resultWorkspace.height;

		this.ngRedux.dispatch(this.editorActions.setWorkspace(resultWorkspace));
	}

	prepareNumberData (str : string) {
		if (this.isVailid(str)) {
			return +this.metricService.convertFromCurToDef(this.getField(str));
		}
		return null;
	}

	/**
	 * initForm - функция, отвечающее за инициализацию формы. В случае успешной
	 * инициализации, возвращается истина, в противном случае ложь.
	 *
	 * @kind {function}
	 * @return {boolean}
	 */
	initForm () : boolean {
		if (!this.workspace || !this.isActiveMetric) {
			return false;
		}
		this.form.setValue({
			width : this.metricService.convertFromDefToCur(this.workspace.width).toString(),
			height : this.metricService.convertFromDefToCur(this.workspace.height).toString()
		});
		return true;
	}

	/**
	 * updateNumberValue - функция, выполняющее обновление цифрового поля 'fieldName'.
	 *
	 * @kind {function}
	 * @param {string} fieldName - наименование поля
	 * @return {void}
	 */
	updateNumberValue (fieldName : string) : void {
		if (!this.isActiveMetric || !this.isVailid(fieldName)) {
			return;
		}
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
		return this.form ? this.form.get(fieldName).valid : false;
	}

	/**
	 * getField - функция, возвращающая значение поля.
	 *
	 * @kind {function}
	 * @param {string} fieldName - наименование поля
	 * @return {string}
	 */
	getField (fieldName : string) : string {
		return this.form ? this.form.get(fieldName).value.toString() : '';
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
