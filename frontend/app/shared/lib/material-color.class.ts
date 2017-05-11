import { Rgba, IRgba, Hsla, IHsla, Hex, IHex } from './color.class';
import { ColorModel } from './color-model.class';

type IColor = IRgba | IHsla | IHex;

export interface IMaterialColor {
	type : string;
	data : IRgba;
}

export class MaterialColor implements IMaterialColor {
	private _type : string;
	private _data : Rgba;

	constructor (color ?: IMaterialColor) {
		if (color) {
			this.type = color.type;
			this.setColor(color.type, color.data);
		} else {
			this.type = 'rgba';
			this.setColor('rgba', new Rgba());
		}
	}

	set type (data : string) {
		this._type = data;
	}
	get type () : string {
		return this._type;
	}

	set data (data : IRgba) {
		this._data = new Rgba(data);
	}
	get data () : IRgba {
		return this._data;
	}

	setColor (type : string, data : IColor) : MaterialColor {
		if (!data) {
			return this;
		}
		switch (type) {
			case 'rgba' : {
				let color : IRgba = <IRgba>data;
				this.data = color;
				break;
			}
			case 'hsla' : {
				let color : IRgba = ColorModel.hslaToRgba(<IHsla>data);
				this.data = color;
				break;
			}
			case 'hex' : {
				let color : IRgba = ColorModel.hexToRgba(<IHex>data);
				this.data = color;
				break;
			}
		}
		return this;
	}
	getColor (type : string) : IColor {
		switch (type) {
			case 'rgba' :
				return new Rgba(<IRgba>this.data.valueOf());
			case 'hsla' :
				return new Hsla(<IHsla>ColorModel.rgbaToHsla(this.data));
			case 'hex' :
				return new Hex(<IHex>ColorModel.rgbaToHex(this.data));
		}
		return null;
	}

	/**
	 * valueOf - функция, возвращающая объектное представление класса.
	 *
	 * @kind {function}
	 * @return {IMaterialColor}
	 */
	valueOf () : IMaterialColor {
		return {
			type : this.type,
			data : this.data
		};
	}

	/**
	 * toString - функция, возвращающая строковое представление класса.
	 *
	 * @kind {function}
	 * @return {string}
	 */
	toString () : string {
		return this.data.toString();
	}
}
