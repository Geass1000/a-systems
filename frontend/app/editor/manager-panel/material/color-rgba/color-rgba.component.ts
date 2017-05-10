import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../../actions/editor.actions';

import { LoggerService } from '../../../../core/logger.service';

import { EditorForm } from '../../../../shared/lib/editor-form.class';
import { isNumber } from '../../../../shared/validators/is-number.validator';

import { Material } from '../../../../shared/lib/material.class';
import { MaterialColor } from '../../../../shared/lib/material-color.class';

@Component({
	moduleId: module.id,
  selector: 'as-editor-manager-material-color-rgba',
	templateUrl: 'color-rgba.component.html',
  styleUrls: [ 'color-rgba.component.css' ]
})
export class ColorRgbaComponent implements OnInit, OnDestroy {
	/* Private Variable */
	private form : FormGroup;
	private editorForm : EditorForm;

	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['editor', 'state', 'material']) material$ : Observable<Material>;
	private material : Material;
	private color : MaterialColor;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private logger : LoggerService,
						 	 private fb : FormBuilder) {
	}
	ngOnInit () {
		this.buildForm();
		this.subscription.push(this.material$.subscribe((data) => {
			this.material = data;
			this.color = <MaterialColor>this.material.payload;
			this.logger.info(`${this.constructor.name} - ngOnInit:`, 'Redux - material -', this.material);
			this.logger.info(`${this.constructor.name} - ngOnInit:`, 'Redux - color -', this.color);
			this.editorForm.setModel(this.setModel.bind(this));
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
			'red' : [ '', [ Validators.required, isNumber(false) ] ],
			'green' : [ '', [ Validators.required, isNumber(false) ] ],
			'blue' : [ '', [ Validators.required, isNumber(false) ] ],
			'alfa' : [ '', [ Validators.required, isNumber(false) ] ]
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
		if (!this.color) {
			return false;
		}
		this.logger.info(`${this.constructor.name} - setModel: Use`);
		this.form.setValue({
			red : this.color.red.toString(),
			green : this.color.green.toString(),
			blue : this.color.blue.toString(),
			alfa : this.color.alfa.toString()
		});
		return true;
	}

	/**
	 * onChangeValue - событе, отвечающее за обновление данных в Redux.
	 *
	 * @kind {event}
	 * @return {void}
	 */
	onChangeValue () : void {
		if (!this.material || !this.color) {
			return;
		}
		this.logger.info(`${this.constructor.name} - onChangeValue: Use`);
		let result : MaterialColor = new MaterialColor();
		result.setColor(`rgba(${this.color})`);

		//this.ngRedux.dispatch(this.editorActions.setWorkspace(resultWorkspace));
	}

	/**
	 * getFormField - функция, возвращающая значение поля.
	 *
	 * @kind {function}
	 * @param {string} fieldName - наименование поля
	 * @return {string}
	 */
	getFormField (fieldName : string) : string {
		let field : string = this.form.get(fieldName).toString();
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
