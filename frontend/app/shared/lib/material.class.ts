import { IMaterialColor, MaterialColor } from './material-color.class';
import { IMaterialTexture, MaterialTexture } from './material-texture.class';

export interface IMaterial {
	type : string;
	data : IMaterialColor | IMaterialTexture;
}

export class Material implements IMaterial {
	private _type : string; // types: 'color' or 'texture'

	private color : MaterialColor;
	private texture : MaterialTexture;

	constructor (obj ?: IMaterial) {
		this.color = new MaterialColor();
		this.texture = new MaterialTexture();
		if (obj) {
			this.type = obj.type;
			this.data = obj.data;
		} else {
			this.type = 'color';
		}
	}

	set type (data : string) {
		this._type = data;
	}
	get type () : string {
		return this._type;
	}
	set data (data : IMaterialColor | IMaterialTexture) {
		switch (this.type) {
			case 'color' :
				this.color = data ? new MaterialColor(<IMaterialColor>data) : this.color;
				break;
			case 'texture' :
				this.texture = data ? new MaterialTexture(<IMaterialTexture>data) : this.texture;
				break;
			case 'none' :
				break;
		}
	}
	get data () : IMaterialColor | IMaterialTexture {
		switch (this.type) {
			case 'color' :
				return this.color;
			case 'texture' :
				return this.texture;
			case 'none' :
				return null;
		}
	}

	/**
	 * setType - функция, выполняющая установку типа материала.
	 *
	 * @kind {function}
	 * @param {string} type - тип материала
	 * @return {Material}
	 */
	setType (type : string) : Material {
		this.type = type;
		return this;
	}

	/**
	 * isType - функция, возвращающая истину если посланный тип материала совпадает
	 * с типом материала класса.
	 *
	 * @kind {function}
	 * @param {string} type - тип материала
	 * @return {boolean}
	 */
	isType (type : string) : boolean {
		return this.type === type;
	}

	/**
	 * toString - функция, возвращающая строковое представление класса.
	 *
	 * @kind {function}
	 * @return {string}
	 */
	toString () : string {
		switch (this.type) {
			case 'color' : return this.color.toString();
			case 'texture' : return this.texture.toString();
			case 'none' : return 'none';
		}
		return '';
	}

	/**
	 * toFill - функция, возвращающая строковое представление класса.
	 *
	 * @kind {function}
	 * @return {string}
	 */
	toFill (...restOfId : Array<string>) : string {
		switch (this.type) {
			case 'color' : return this.color.toString();
			case 'texture' : {
				if (!this.texture.id) {
					return '#fff';
				}
				return restOfId.length ? `url(${location.href}#${restOfId.join('-')})` : 'none';
			}
			case 'none' : return 'none';
		}
	}

	/**
	 * toFill - функция, возвращающая строковое представление класса.
	 *
	 * @kind {function}
	 * @return {string}
	 */
	getSrcTexture () : string {
		return this.isType('texture') ? this.texture.getSrc() : '';
	}
}
