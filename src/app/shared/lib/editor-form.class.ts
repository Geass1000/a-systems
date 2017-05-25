import { FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

export class EditorForm {
	private form : FormGroup;

	private isInit : boolean;					// Установлены ли данные модели в форме?
	private changeModel : boolean;		// Была ли изменена модель в компоненте?
	private changeMeasure : boolean;	// Были ли изменены данные визуально?

	private callbackSetModel : (data ?: any) => boolean;
	private callbackUpdateModel : (data ?: any) => any;
	private callbackOnChangeValue : (data ?: any) => any;

	constructor (form : FormGroup) {
		this.form = form;
	}

	/**
	 * subscribeValueChanges - функция-обёртка. Осуществляет подписку на событие
	 * формы 'ValueChanges'.
	 *
	 * @example
	 * function callback () { ... }
	 * this.editorForm.subscribeValueChanges(callback);
	 *
	 * @function
	 * @param {function} callback - функция обратного вызова, функция-событие
	 * @return {void}
	 */
	subscribeValueChanges (callback : (data ?: any) => any) : Subscription {
		return this.form.valueChanges.subscribe((data) => this.onChangeValue(data, callback));
	}

	/**
	 * setModel - функция-обёртка. Обеспечивает корректную логику установки данных.
	 * Функция обратного вызова устанавливает значения формы в соответствии с
	 * данными из хранилища.
	 *
	 * Не реагирует на изменения данных из компонента в котором применяется.
	 *
	 * @example
	 * function callback () { ... }
	 * this.editorForm.setModel(callback);
	 *
	 * @function
	 * @param {function} callback - функция обратного вызова, изменяющая данные
	 * @return {void}
	 */
	setModel (callback : (data ?: any) => boolean) : void {
		if (!this.callbackSetModel) {
			this.callbackSetModel = callback;
		}

		this.isInit = false;
		if (this.changeModel) {
			this.changeModel = false;
			this.isInit = true;
			return ;
		}
		this.isInit = this.callbackSetModel();
	}

	/**
	 * updateModel - функция-обёртка. Обеспечивает корректную логику обновления данных
	 * формы. Функция обратного вызова обновляет значения формы без вызова события
	 * сохранения данных в хранилище.
	 *
	 * Вызывается в случае необходимости только визуальных изменений данных.
	 *
	 * @example
	 * function callback () { ... }
	 * this.editorForm.updateModel(callback);
	 *
	 * @function
	 * @param {function} callback - функция обратного вызова, обновляющая данные визуально
	 * @return {void}
	 */
	updateModel (callback : (data ?: any) => any) : void {
		if (!this.callbackUpdateModel) {
			this.callbackUpdateModel = callback;
		}

		if (!this.isInit) {
			this.setModel(this.callbackSetModel);
			return ;
		}

		this.changeMeasure = true;
		this.callbackUpdateModel();
		this.changeMeasure = false;
	}

	/**
	 * onChangeValue - событе, отвечающее за обновление данных в Redux.
	 *
	 * @kind {event}
	 * @param {any} data - объект с данными из формы
	 * @param {function} callback - функция обратного вызова, для обработки обновленных данных
	 * @return {void}
	 */
	private onChangeValue (data : any, callback : (data ?: any) => any) {
		if (!this.callbackOnChangeValue) {
			this.callbackOnChangeValue = callback;
		}
		if (this.changeMeasure || !this.isInit || !this.form.valid) {
			return;
		}
		this.changeModel = true;
		this.callbackOnChangeValue(data);
	}

	/**
	 * emitChange - функция, выполняющая генерацию события ChangeValue.
	 *
	 * @kind {event}
	 * @param {any} data - объект с данными из формы
	 * @param {function} callback - функция обратного вызова, для обработки обновленных данных
	 * @return {void}
	 */
	emitChange () {
		this.onChangeValue(null, this.callbackOnChangeValue);
	}
}
