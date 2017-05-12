import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../../actions/editor.actions';

import { EditorForm } from '../../../../shared/lib/editor-form.class';
import { isNumber } from '../../../../shared/validators/is-number.validator';

import { LoggerService } from '../../../../core/logger.service';
import { ITexture, ITextureCategory } from '../../../../shared/interfaces/editor.interface';
//import { MaterialColor } from '../../../shared/lib/material-color.class';

@Component({
	moduleId: module.id,
  selector: 'as-editor-manager-material-texture',
	templateUrl: 'texture.component.html',
  styleUrls: [ 'texture.component.css' ]
})
export class TextureComponent implements OnInit, OnDestroy {
	/* Private variable */
	private activeTextureId : string = null;
	private activeTextureCategoryId : string = '';

	private form : FormGroup;
	private editorForm : EditorForm;

	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['editor', 'texture', 'categories']) textureCategories$ : Observable<Map<string, ITextureCategory>>;
	private textureCategoriesData : Map<string, ITextureCategory> = new Map();
	private textureCategories : Array<ITextureCategory> = [];
	@select(['editor', 'texture', 'textures']) textures$ : Observable<Map<string, ITexture>>;
	private textures : Array<ITexture> = [];
	private texturesDisplay : Array<ITexture> = [];

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private logger : LoggerService,
						 	 private fb : FormBuilder) {
		this.activeTextureId = null;
	}
	ngOnInit () {
		this.buildForm();
		this.subscription.push(this.textureCategories$.subscribe((data) => {
			this.textureCategoriesData = data;
			this.textureCategories = data ? Array.from(data.values()) : [];
		}));

		this.subscription.push(this.textures$.subscribe((data) => {
			this.textures = Array.from(data.values());

			if (data.size !== 0) {
				this.texturesDisplay = this.textures.filter((d2) => d2._cid === this.activeTextureCategoryId);
			}
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
			'angle' : [ '', [ Validators.required, isNumber(false) ] ],
			'scale' : [ '', [ Validators.required, isNumber(true) ] ]
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
		return true;
	}

	/**
	 * onChangeValue - событе, отвечающее за обновление данных в Redux.
	 *
	 * @kind {event}
	 * @return {void}
	 */
	onChangeValue () : void {
	}

	/**
	 * getFormField - функция, возвращающая значение поля.
	 *
	 * @kind {function}
	 * @param {string} fieldName - наименование поля
	 * @return {string}
	 */
	getFormField (fieldName : string) : string {
		let field = this.form.get(fieldName);
		return field ? field.value.toString() : '';
	}

	/**
	 * getSrcTexture - функция, возвращающая путь к изображениям с текстурами.
	 *
	 * @kind {function}
	 * @param  {ITexture} texture - объект с данными о текстуре
	 * @return {type}
	 */
	getSrcTexture (texture : ITexture) {
		return `url('assets/textures/${texture.url}')`;
	}

	/**
	 * onClickSetTexture - событие, отслеживающее выбор текстуры и отвечающее за
	 * фиксацию полученых данных.
	 *
	 * @kind {event}
	 * @param  {MouseEvent} event
	 * @return {type}
	 */
	onClickSetTexture (event : MouseEvent) {
		let el : Element = (<HTMLElement>event.target).closest('.item');
		if (!el) {
			return;
		}
		this.logger.info(`${this.constructor.name}:`, 'onClickSetTexture -', el);
		let itemId : string = el.getAttribute('data-item-id');
		if (!itemId) {
			return;
		}
		this.logger.info(`${this.constructor.name}:`, 'onClickSetTexture -', itemId);
		this.activeTextureId = itemId;
	}

	/**
	 * onChangeTextureCategory - событие, отслеживающее изменение категории текстур и
	 * выполняющее фильтрацию списка отображаемых текстур.
	 *
	 * @kind {event}
	 * @param  {Event} event
	 * @return {type}
	 */
	onChangeTextureCategory (event : Event) {
		this.logger.info(`${this.constructor.name}:`, 'onChangeTextureCategory -',
			`${this.activeTextureCategoryId} = ${this.textureCategoriesData.get(this.activeTextureCategoryId).name}`);

		this.texturesDisplay = this.textures.filter((data) => data._cid === this.activeTextureCategoryId);
	}
}
