import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/* App Redux and Request */
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../../actions/editor.actions';

/* App Services */
import { LoggerService } from '../../../../core/logger.service';
import { MetricService } from '../../../metric.service';

/* App Interfaces and Classes */
import { Thing } from '../../../../shared/lib/thing.class';
import { EditorForm } from '../../../../shared/lib/editor-form.class';
import { IElement } from '../../../../shared/interfaces/editor.interface';

/* App Validators */
import { isNumber } from '../../../../shared/validators/is-number.validator';

@Component({
	moduleId: module.id,
  selector: 'as-editor-manager-workstate-thing',
	templateUrl: 'thing.component.html',
  styleUrls: [ 'thing.component.scss' ]
})
export class ThingComponent implements OnInit, OnDestroy {
	/* Private Variable */
	private editorForm : EditorForm;

	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['editor', 'state', 'isActiveMetric']) isActiveMetric$ : Observable<boolean>;
	private isActiveMetric : boolean = null;
	@select(['editor', 'project', 'things']) things$ : Observable<Array<Thing>>;
	private things : Array<Thing>;
	@select(['editor', 'state', 'activeElements']) activeElements$ : Observable<Array<IElement>>;
	private activeElements : Array<IElement>;

	/* Public variable */
	public model : Thing = null;
	public form : FormGroup;

	constructor (private fb : FormBuilder,
							 private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private logger : LoggerService,
						 	 private metricService : MetricService) {
	}
	ngOnInit () {
		this.buildForm();
		this.subscription.push(this.things$.subscribe((data) => {
			this.things = data;
			this.editorForm.setModel(this.setModel.bind(this));
		}));
		this.subscription.push(this.activeElements$.subscribe((data) => {
			this.activeElements = data;
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
	 * @function
	 * @return {void}
	 */
	buildForm () : void {
		this.form = this.fb.group({
			'coordX' : [ '', [ Validators.required, isNumber(true) ] ],
			'coordY' : [ '', [ Validators.required, isNumber(true) ] ],
			'angle' : [ '', [ Validators.required, isNumber(false) ] ]
		});

		this.editorForm = new EditorForm(this.form);
		const sub = this.editorForm.subscribeValueChanges(this.onChangeValue.bind(this));
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
		if (!this.things || !this.activeElements ||
				!this.activeElements.length || !this.isActiveMetric ||
				this.activeElements[0].type !== 'thing') {
			return false;
		}
		this.model = this.things[this.activeElements[0].id];
		this.form.setValue({
			coordX : this.metricService.convertFromDefToCur(this.model.x).toString(),
			coordY : this.metricService.convertFromDefToCur(this.model.y).toString(),
			angle : this.model.angle
		});
		return true;
	}

	/**
	 * updateModel - функция, обновляющая значения полей в случае изменения
	 * величины измерения.
	 *
	 * @function
	 * @return {void}
	 */
	updateModel () : void {
		if (!this.isActiveMetric) {
			return ;
		}
		this.logger.info(`${this.constructor.name}:`, 'updateModel');
		this.metricService.updateFormValueToCurMetric(this.form, 'coordX');
		this.metricService.updateFormValueToCurMetric(this.form, 'coordY');
	}

	/**
	 * onChangeValue - событе, отвечающее за обновление данных в Redux.
	 *
	 * @kind {event}
	 * @return {void}
	 */
	onChangeValue () : void {
		if (!this.model || !this.isActiveMetric) {
			return;
		}
		this.logger.info(`${this.constructor.name}:`, 'onChangeValue');
		const result : Thing = new Thing(this.model);

		const tmpX : number = this.metricService.getNumberFieldValueToDefMetric(this.form, 'coordX');
		result.x = tmpX !== null ? tmpX : result.y;
		const tmpY : number = this.metricService.getNumberFieldValueToDefMetric(this.form, 'coordY');
		result.y = tmpY !== null ? tmpY : result.y;
		result.angle = +this.getFormField('angle');

		this.ngRedux.dispatch(this.editorActions.updateThing(this.activeElements[0].id, result));
	}

	/**
	 * getFormField - функция, возвращающая значение поля.
	 *
	 * @function
	 * @param {string} fieldName - наименование поля
	 * @return {string}
	 */
	getFormField (fieldName : string) : string {
		const field : string = this.metricService.getFieldValue(this.form, fieldName);
		return field ? field : '';
	}

	/**
	 * onClickOpenMaterial - событие, отвечающее за вызов текстурного компонента.
	 *
	 * @kind {event}
	 * @return {void}
	 */
	onClickOpenMaterial () : void {
		const el : Element = (<HTMLElement>event.target).closest('.item-texture');
		if (!el) {
			return;
		}
		this.logger.info(`${this.constructor.name} - onClickSetTexture: el -`, el);
		const itemType : string = el.getAttribute('data-item-type');
		if (!itemType) {
			return;
		}
		this.logger.info(`${this.constructor.name} - onClickSetTexture: id -`, itemType);
		this.ngRedux.dispatch(this.editorActions.setMaterial(this.model[itemType]));
		this.ngRedux.dispatch(this.editorActions.openManagerPanel('material'));
	}
}
