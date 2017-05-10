
/**
 * RegexColor - хранилище (Map), содержащее регулярные выражения для проверки
 * строк на соответствие различным цветовым моделям.
 *
 * @kind {store}
 */
export const RegexColor : Map<string, RegExp> = new Map([
	['hex', /^#([a-f\d]{6}|[a-f\d]{3})$/],
	['rgb', /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
	['rgba', /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d+(?:\.\d+)?)\s*\)$/],
	['hsl', /^hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*\)$/],
	['hsla', /^hsla\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)\s*\)$/]
]);

/**
 * prepareColorData - функция, выполняющая подготовку цвета перед сохранением.
 *
 * @kind {function}
 * @param {number} data - значение цвета
 * @param {number} min - минимальное значение цвета
 * @param {number} max - максимальное значение цвета
 * @return {number}
 */
function prepareColorData (data : number, min : number, max : number) : number {
	data = isFinite(data) ? data : max;
	data = data < min ? min : data;
	data = data > max ? max : data;
	return data;
}

export interface IRgba {
	red : number;
	green : number;
	blue : number;
	alfa : number;
}

export class Rgba implements IRgba {
	private _red : number;
	private _green : number;
	private _blue : number;
	private _alfa : number;

	constructor (color ?: IRgba) {
		if (color) {
			this.setColor(color.red, color.green, color.blue, color.alfa);
		} else {
			this.setColor(255, 255, 255, 1);
		}
	}

	set red (data : number) {
		this._red = prepareColorData(data, 0, 255);
	}
	get red () : number {
		return this._red;
	}
	set green (data : number) {
		this._green = prepareColorData(data, 0, 255);
	}
	get green () : number {
		return this._green;
	}
	set blue (data : number) {
		this._blue = prepareColorData(data, 0, 255);
	}
	get blue () : number {
		return this._blue;
	}
	set alfa (data : number) {
		this._alfa = prepareColorData(data, 0, 1);
	}
	get alfa () : number {
		return this._alfa;
	}

	/**
	 * setColor - функция, устанавливающая цветовые свойства класса (red, green, blue, alfa).
	 *
	 * @kind {function}
	 * @param {number} r - красный цвет
	 * @param {number} g - зелёный цвет
	 * @param {number} b - синий цвет
	 * @param {number} a - альфа-канал
	 * @return {void}
	 */
	public setColor (r : number, g : number, b: number, a : number) : void {
		this.red = r;
		this.green = g;
		this.blue = b;
		this.alfa = a;
	}

	/**
	 * valueOf - функция, возвращающая объектное представление класса.
	 *
	 * @kind {function}
	 * @return {IRgba}
	 */
	valueOf () : IRgba {
		return {
			red : this.red,
			green : this.green,
			blue : this.blue,
			alfa : this.alfa
		};
	}

	/**
	 * toString - функция, возвращающая строковое представление класса.
	 *
	 * @kind {function}
	 * @return {string}
	 */
	toString () : string {
		return `rgba(${this.red},${this.green},${this.blue},${this.alfa})`;
	}
}

export interface IHsla {
	hue : number;
	saturation : number;
	lightness : number;
	alfa : number;
}

export class Hsla implements IHsla {
	private _hue : number;
	private _saturation : number;
	private _lightness : number;
	private _alfa : number;

	constructor (color ?: IHsla) {
		if (color) {
			this.setColor(color.hue, color.saturation, color.lightness, color.alfa);
		} else {
			this.setColor(0, 100, 100, 1);
		}
	}

	set hue (data : number) {
		this._hue = prepareColorData(data, 0, 360);
	}
	get hue () : number {
		return this._hue;
	}
	set saturation (data : number) {
		this._saturation = prepareColorData(data, 0, 100);
	}
	get saturation () : number {
		return this._saturation;
	}
	set lightness (data : number) {
		this._lightness = prepareColorData(data, 0, 100);
	}
	get lightness () : number {
		return this._lightness;
	}
	set alfa (data : number) {
		this._alfa = prepareColorData(data, 0, 1);
	}
	get alfa () : number {
		return this._alfa;
	}

	/**
	 * setColor - функция, устанавливающая цветовые свойства класса (hue, saturation, lightness, alfa).
	 *
	 * @kind {function}
	 * @param {number} h - тон цвета
	 * @param {number} s - насыщенность цвета
	 * @param {number} l - светлота цвета
	 * @param {number} a - альфа-канал
	 * @return {void}
	 */
	public setColor (h : number, s : number, l: number, a : number) : void {
		this.hue = h;
		this.saturation = s;
		this.lightness = l;
		this.alfa = a;
	}

	/**
	 * valueOf - функция, возвращающая объектное представление класса.
	 *
	 * @kind {function}
	 * @return {IHsla}
	 */
	valueOf () : IHsla {
		return {
			hue : this.hue,
			saturation : this.saturation,
			lightness : this.lightness,
			alfa : this.alfa
		};
	}

	/**
	 * toString - функция, возвращающая строковое представление класса.
	 *
	 * @kind {function}
	 * @return {string}
	 */
	toString () : string {
		return `hsla(${this.hue},${this.saturation},${this.lightness},${this.alfa})`;
	}
}

export interface IHex {
	hex : string;
	alfa : number;
}

export class Hex implements IHex {
	private _hex : string;
	private _alfa : number;

	constructor (color ?: IHex) {
		if (color) {
			this.setColor(color.hex, color.alfa);
		} else {
			this.setColor('ffffff', 1);
		}
	}

	set hex (data : string) {
		let rgx : RegExp = RegexColor.get('hex');
		let hex : string = rgx.test(data) ? data : 'ffffff';
		rgx = /^([a-f\d])([a-f\d])([a-f\d])$/;
		hex = hex.replace(rgx, (m, f1, f2, f3) => {
			return f1 + f1 + f2 + f2 + f3 + f3;
		});
		this._hex = hex;
	}
	get hex () : string {
		return this._hex;
	}
	set alfa (data : number) {
		this._alfa = prepareColorData(data, 0, 1);
	}
	get alfa () : number {
		return this._alfa;
	}

	/**
	 * setColor - функция, устанавливающая цветовые свойства класса (hex, alfa).
	 *
	 * @kind {function}
	 * @param {string} h - 16-й цвет
	 * @param {number} a - альфа-канал
	 * @return {void}
	 */
	public setColor (h : string, a : number) : void {
		this.hex = h;
		this.alfa = a;
	}

	/**
	 * valueOf - функция, возвращающая объектное представление класса.
	 *
	 * @kind {function}
	 * @return {IHsla}
	 */
	valueOf () : IHex {
		return {
			hex : this.hex,
			alfa : this.alfa
		};
	}

	/**
	 * toString - функция, возвращающая строковое представление класса.
	 *
	 * @kind {function}
	 * @return {string}
	 */
	toString () : string {
		return `#${this.hex}`;
	}
}
