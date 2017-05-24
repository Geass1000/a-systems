import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/* App Redux and Request */
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../../actions/editor.actions';

/* App Services */
import { LoggerService } from '../../../../core/logger.service';

/* App Interfaces and Classes */
import { EditorForm } from '../../../../shared/lib/editor-form.class';
import { Material } from '../../../../shared/lib/material.class';
import { MaterialColor } from '../../../../shared/lib/material-color.class';
import { Rgba, IRgba } from '../../../../shared/lib/color.class';

/* App Validators */
import { isNumber } from '../../../../shared/validators/is-number.validator';

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

	constructor (private fb : FormBuilder,
							 private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private logger : LoggerService) {
	}
	ngOnInit () {
		this.buildForm();
		this.subscription.push(this.material$.subscribe((data) => {
			if (!data) {
				return;
			}
			this.material = data;
			this.color = new MaterialColor(<MaterialColor>this.material.data);
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
	 * @function
	 * @return {void}
	 */
	buildForm () : void {
		this.form = this.fb.group({
			'red' : [ '', [ Validators.required, isNumber(false) ] ],
			'green' : [ '', [ Validators.required, isNumber(false) ] ],
			'blue' : [ '', [ Validators.required, isNumber(false) ] ],
			'alfa' : [ '', [ Validators.required, isNumber(true) ] ]
		});

		this.editorForm = new EditorForm(this.form);
		let sub = this.editorForm.subscribeValueChanges(this.onChangeValue.bind(this));
		this.subscription.push(sub);
	}

	/**
	 * setModel - функция, синхронизирующая значения формы со значениями модели из
	 * хранилища. Возвращает истину, если синхронизация произошла успешно.
	 *
	 * @function
	 * @return {boolean}
	 */
	setModel () : boolean {
		if (!this.color) {
			return false;
		}
		this.logger.info(`${this.constructor.name} - setModel: Use`);
		let color : IRgba = <IRgba>this.color.getColor('rgba');
		this.form.setValue({
			red : color.red.toString(),
			green : color.green.toString(),
			blue : color.blue.toString(),
			alfa : color.alfa.toString()
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
		let color : Rgba = new Rgba({
			red : +this.getFormField('red'),
			green : +this.getFormField('green'),
			blue : +this.getFormField('blue'),
			alfa : +this.getFormField('alfa')
		});
		let result : MaterialColor = new MaterialColor({
			type : 'rgba',
			data : color
		});
		let material : Material = new Material({
			type : 'color',
			data : result
		});
		this.color = result;
		this.logger.info(`${this.constructor.name} - onChangeValue: result -`, result);
		this.ngRedux.dispatch(this.editorActions.updateMaterial(material));
	}

	/**
	 * getFormField - функция, возвращающая значение поля.
	 *
	 * @function
	 * @param {string} fieldName - наименование поля
	 * @return {string}
	 */
	getFormField (fieldName : string) : string {
		let field = this.form.get(fieldName);
		return field ? field.value.toString() : '';
	}
}
