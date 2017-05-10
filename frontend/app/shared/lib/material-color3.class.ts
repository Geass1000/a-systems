import { IRgba, Rgba, IHsla, Hsla, IHex, Hex } from './color.class';

type Color = Rgba | Hsla | Hex;
type IColor = IRgba | IHsla | IHex;

export interface IMaterialColor {
	type : string;
	data : IColor;
}

export class MaterialColor implements IMaterialColor {
	private _type : string;
	private _data : Color;

	constructor (color ?: IMaterialColor) {
		if (color) {
			this.type = color.type;
			this.data = color.data;
		} else {
			this.type = 'rgba';
			this.data = new Rgba();
		}
	}

	set type (data : string) {
		this._type = data;
	}
	get type () : string {
		return this._type;
	}
	set data (data : IColor) {
		switch (this.type) {
			case 'rgba' :
				this._data = data ? new Rgba(<IRgba>data) : new Rgba();
				break;
			case 'hsla' :
				this._data = data ? new Hsla(<IHsla>data) : new Hsla();
				break;
			case 'hex' :
				this._data = data ? new Hex(<IHex>data) : new Hex();
				break;
		}
	}
	get data () : IColor {
		return this._data;
	}
}
