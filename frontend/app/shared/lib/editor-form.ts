import { FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

export class EditorForm {
	private form : FormGroup;
	private model : any;

	private isInit : boolean;
	private changeModel : boolean;
	private changeMeasure : boolean;

	private callbackSetModel : (data ?: any) => any;
	private callbackUpdateModel : (data ?: any) => any;
	private callbackOnChangeValue : (data ?: any) => any;

	constructor (form : FormGroup) {
		this.form = form;
	}
	subscribeValueChanges (callback : (data ?: any) => any) : Subscription {
		return this.form.valueChanges.subscribe((data) => this.onChangeValue(callback(data)));
	}

	/**
	 * setModel - функция, синхронизирующая значения формы со значениями модели из
	 * хранилища. Не реагирует на изменение модели из данного компонента.
	 *
	 * @example
	 * function callback () { ... }
	 * let model = {};
	 * this.editorForm.setModel(model, callback);
	 *
	 * @kind {function}
	 * @param {any} model - модель данных
	 * @param {function} callback - функция обратного вызова, изменяющая данные
	 * @return {void}
	 */
	setModel (model : any, callback : (data ?: any) => any) : void {
		if (!this.callbackSetModel) {
			this.callbackSetModel = callback;
		}
		this.model = model;

		this.isInit = false;
		if (this.changeModel) {
			this.changeModel = false;
			this.isInit = true;
			return ;
		}
		this.callbackSetModel(this.model);
		this.isInit = true;
	}

	updateModel (callback : (data ?: any) => any) : void {
		if (!this.callbackUpdateModel) {
			this.callbackUpdateModel = callback;
		}

		if (!this.isInit) {
			this.setModel(this.model, this.callbackSetModel);
			return ;
		}

		this.changeMeasure = true;
		this.callbackUpdateModel(this.model);
		this.changeMeasure = false;
	}

	/**
	 * onChangeValue - событе, отвечающее за обновление данных в Redux.
	 *
	 * @kind {event}
	 * @param {any} data - объект с данными из формы
	 * @return {void}
	 */
	private onChangeValue (callback : (data ?: any) => any) {
		if (!this.callbackOnChangeValue) {
			this.callbackOnChangeValue = callback;
		}

		if (this.changeMeasure) {
			return;
		}
		if (!this.model || !this.form.valid || !this.isInit) {
			return;
		}
		this.changeModel = true;
		this.callbackOnChangeValue(this.model);
	}
}
