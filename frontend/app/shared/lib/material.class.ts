import { IMaterialColor, MaterialColor } from './material-color.class';
import { IMaterialTexture, MaterialTexture } from './material-texture.class';

export interface IMaterial {
	type : string;
	payload : IMaterialColor | IMaterialTexture;
}

export class Material implements IMaterial {
	private _type : string; // types: 'color' or 'texture'

	private color : MaterialColor;
	private texture : MaterialTexture;

	constructor ( ) {
		this.type = 'color';
		this.color = new MaterialColor();
		this.texture = new MaterialTexture();
	}

	set type (data : string) {
		this._type = data;
	}
	get type () : string {
		return this._type;
	}
	set payload (data : IMaterialColor | IMaterialTexture) {
		switch (this.type) {
			case 'color' :
				this.color = new MaterialColor(<IMaterialColor>data);
				break;
			case 'texture' :
				this.texture = new MaterialTexture(<IMaterialTexture>data);
				break;
		}
	}
	get payload () : IMaterialColor | IMaterialTexture {
		switch (this.type) {
			case 'color' :
				return this.color;
			case 'texture' :
				return this.texture;
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
		}
		return '';
	}
}
