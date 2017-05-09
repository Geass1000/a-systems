
/**
 * RegexColor - хранилище (Map), содержащее регулярные выражения для проверки
 * строк на соответствие различным цветовым моделям.
 *
 * @kind {store}
 */
let RegexColor : Map<string, RegExp> = new Map([
	['hex', /^#([a-f\d]{6}|[a-f\d]{3})$/],
	['rgb', /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
	['rgba', /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d+(?:\.\d+)?)\s*\)$/],
	['hsl', /^hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*\)$/],
	['hsla', /^hsla\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)\s*\)$/]
]);

export interface IMaterialColor {
	red : number;
	green : number;
	blue : number;
	alfa : number;
}

export class MaterialColor implements IMaterialColor {
	private _red : number;
	private _green : number;
	private _blue : number;
	private _alfa : number;

	constructor (color ?: IMaterialColor) {
		if (color) {
			this.setRgba(color.red, color.green, color.blue, color.alfa);
		} else {
			this.isNotColor();
		}
	}

	set red (data : number) {
		this._red = this.prepareColorData(data, 0, 255);
	}
	get red () : number {
		return this._red;
	}
	set green (data : number) {
		this._green = this.prepareColorData(data, 0, 255);
	}
	get green () : number {
		return this._green;
	}
	set blue (data : number) {
		this._blue = this.prepareColorData(data, 0, 255);
	}
	get blue () : number {
		return this._blue;
	}
	set alfa (data : number) {
		this._alfa = this.prepareColorData(data, 0, 1);
	}
	get alfa () : number {
		return this._alfa;
	}

	/**
	 * prepareColorData - функция, выполняющая подготовку цвета перед сохранением.
	 *
	 * @kind {function}
	 * @param {number} data - значение цвета
	 * @param {number} min - минимальное значение цвета
	 * @param {number} max - максимальное значение цвета
	 * @return {number}
	 */
	private prepareColorData (data : number, min : number, max : number) : number {
		data = isFinite(data) ? data : max;
		data = data < min ? min : data;
		data = data > max ? max : data;
		return data;
	}

	/**
	 * setColor - функция, выполняющая установку цвета.
	 *
	 * @kind {function}
	 * @param {string} str - строка с цветом
	 * @return {MaterialColor}
	 */
	public setColor (str : string) : MaterialColor {
		if (!str) {
			throw new Error('MaterialColor - setColor: All params is required!');
		}

		let type : string = this.typeDefinition(str);
		switch (type) {
			case 'hex' :
				this.isHex(str, type);
				break;
			case 'rgb' :
			case 'rgba' :
				this.isRgbOrRgba(str, type);
				break;
			case 'hsl' :
			case 'hsla' :
				this.isHslOrHsla(str, type);
				break;
			default :
				this.isNotColor();
				break;
		}
		return this;
	}

	/**
	 * getColor - функция, возвращающая строку со значениями цвета, разделёнными запятыми.
	 *
	 * @kind {function}
	 * @param {string} type - строка с цветом
	 * @return {string}
	 */
	public getColor (type : string = 'rgba') : string {
		let color : string = null;
		switch (type) {
			case 'hex' : {
				color = this.rgbToHex(this.red, this.green, this.blue);
				break;
			}
			case 'hsl' :
			case 'hsla' : {
				color = this.rgbaToHsla(this.red, this.green, this.blue, this.alfa);
				break;
			}
			case 'rgb' :
			case 'rgba' : {
				color = `${this.red},${this.green},${this.blue},${this.alfa}`;
				break;
			}
		}
		return color;
	}

	/**
	 * isHex - функция, выполняемая если в класс передана строка имеющая hex
	 * цветовую модель.
	 *
	 * @kind {function}
	 * @param {string} str - строка с цветом
	 * @param {string} type - цветовая модель
	 * @return {void}
	 */
	isHex (str : string, type : string) : void {
		let rgx : RegExp = RegexColor.get(type);
		let result : RegExpMatchArray = str.match(rgx);
		let hex : string = result[1];
		this.hexToRgba(hex);
	}

	/**
	 * isHex - функция, выполняемая если в класс передана строка имеющая hsl или hsla
	 * цветовую модель.
	 *
	 * @kind {function}
	 * @param {string} str - строка с цветом
	 * @param {string} type - цветовая модель
	 * @return {void}
	 */
	isHslOrHsla (str : string, type : string) : void {
		let rgx : RegExp = RegexColor.get(type);
		let result : RegExpMatchArray = str.match(rgx);
		let h : number = +result[1];
		let s : number = (+result[2]) / 100;
		let l : number = (+result[3]) / 100;
		let a : number = type === 'hsl' ? 1 : +result[4];
		this.hslaToRgba(h, s, l, a);
	}

	/**
	 * isHex - функция, выполняемая если в класс передана строка имеющая rgb или rgba
	 * цветовую модель.
	 *
	 * @kind {function}
	 * @param {string} str - строка с цветом
	 * @param {string} type - цветовая модель
	 * @return {void}
	 */
	isRgbOrRgba (str : string, type : string) : void {
		let rgx : RegExp = RegexColor.get(type);
		let result : RegExpMatchArray = str.match(rgx);
		let r : number = +result[1];
		let g : number = +result[2];
		let b : number = +result[3];
		let a : number = type === 'rgb' ? 1 : +result[4];
		this.setRgba(r, g, b, a);
	}

	/**
	 * isHex - функция, выполняемая если в класс передана строка не имеющая цветовой
	 * модели (не является допустимым цветов).
	 *
	 * @kind {function}
	 * @return {void}
	 */
	isNotColor () : void {
		this.setRgba(0, 0, 0, 1);
	}

	/**
	 * typeDefinition - функция, выполняющая определение типа цветовой модели переданного
	 * значения. Если строка не соответствует ни одной цветовой модели, возвращается null.
	 *
	 * @kind {function}
	 * @param {string} str - строка с цветом
	 * @return {string} - цветовая модель
	 */
	typeDefinition (str : string) : string {
		let data : string = str.toLowerCase().trim();
		let result : string = null;
		RegexColor.forEach((val, key) => {
			if (val.test(data)) {
				result = key;
			}
		});
		return result;
	}

	/**
	 * hexToRgba - функция, выполняющая преобразование из одной цветовой модели (из hex)
	 * в другую (в rgba).
	 *
	 * @kind {function}
	 * @param {string} hex - 16-е значение цвета
	 * @return {void}
	 */
	public hexToRgba (hex : string) : void {
		let rgx : RegExp = /^([a-f\d])([a-f\d])([a-f\d])$/;
		hex = hex.replace(rgx, (m, f1, f2, f3) => {
			return f1 + f1 + f2 + f2 + f3 + f3;
		});
		rgx = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/;
		let result : RegExpMatchArray = hex.match(rgx);
		let r : number = parseInt(result[1], 16);
		let g : number = parseInt(result[2], 16);
		let b : number = parseInt(result[3], 16);
		this.setRgba(r, g, b, 1);
	}

	/**
	 * rgbToHex - функция, выполняющая преобразование из одной цветовой модели (из rgb)
	 * в другую (в hex).
	 *
	 * @kind {function}
	 * @param {number} r - красный цвет
	 * @param {number} g - зелёный цвет
	 * @param {number} b - синий цвет
	 * @return {string}
	 */
	public rgbToHex (r : number, g : number, b: number) : string {
		let rgbArr : Array<number> = [r, g, b];
		let hex : string;
		hex = rgbArr.map((data) => {
			let base16 : string = data.toString(16);
			return data < 16 ? base16 + base16 : base16;
		}).join('');
		return hex;
	}

	/**
	 * hslaToRgba - функция, выполняющая преобразование из одной цветовой модели (из hsla)
	 * в другую (в rgba).
	 *
	 * @kind {function}
	 * @param {number} h - тон
	 * @param {number} s - насыщенность
	 * @param {number} l - светлота
	 * @param {number} a - альфа-канал
	 * @return {void}
	 */
	public hslaToRgba (h : number, s : number, l : number, a : number) : void {
		let Q : number = l < 0.5 ? l * (1 + s) : l + s - l * s;
		let P : number = 2 * l - Q;

		let Hk : number = h / 360;

		let Tr : number = Hk + 1 / 3;
		let Tg : number = Hk;
		let Tb : number = Hk - 1 / 3;

		let r : number = Math.round(this.hueRgb(Q, P, Tr) * 255);
		let g : number = Math.round(this.hueRgb(Q, P, Tg) * 255);
		let b : number = Math.round(this.hueRgb(Q, P, Tb) * 255);
		this.setRgba(r, g, b, a);
	}

	/**
	 * rgbaToHsla - функция, выполняющая преобразование из одной цветовой модели (из rgba)
	 * в другую (в hsla).
	 *
	 * @kind {function}
	 * @param {number} r - красный цвет
	 * @param {number} g - зелёный цвет
	 * @param {number} b - синий цвет
	 * @param {number} a - альфа-канал
	 * @return {string}
	 */
	public rgbaToHsla (r : number, g : number, b: number, a: number) : string {
		r /= 255;	g /= 255;	b /= 255;
		let max : number = Math.max(r, g, b),
				min : number = Math.min(r, g, b);
		let sub : number = max - min,
				sum : number = max + min;

		let h : number, s : number, l : number;
		let tmp =  60 / sub;
		if (max === min) {
			h = 0;
		} else if (max === r && g >= b) {
			h = tmp * (g - b);
		} else if (max === r && g < b) {
			h = tmp * (g - b) + 360;
		} else if (max === g) {
			h = tmp * (b - r) + 120;
		} else if (max === b) {
			h = tmp * (r - g) + 240;
		}
		s = sub / (1 - Math.abs(1 - sum));
		l = 1 / 2 * sum;

		h = Math.round(h);
		s = +(s * 100).toFixed(2);
		l = +(l * 100).toFixed(2);
		return `${h},${s},${l},${a}`;
	}

	/**
	 * hueRgb - функция, возвращаюя тон (цвет) в rgb цветовой модели, получаемый из
	 * световых параметров hsl модели.
	 *
	 * @kind {function}
	 * @param {number} q - световой параметр Q
	 * @param {number} p - световой параметр P
	 * @param {number} t - световой параметр T одного из цветов
	 * @return {number} - тон (цвет)
	 */
	private hueRgb (q : number, p : number, t : number) : number {
		if (t < 0) {
			t += 1;
		} else if (t > 1) {
			t -= 1;
		}
		if (t < (1 / 6)) {
			return p + (q - p) * 6 * t;
		}
		if (t >= (1 / 6) && t < (1 / 2)) {
			return q;
		}
		if (t >= (1 / 2) && t < (2 / 3)) {
			return p + (q - p) * (2 / 3 - t) * 6;
		}
		return p;
	}

	/**
	 * setRgba - функция, устанавливающая цветовые свойства класса (red, green, blue, alfa).
	 *
	 * @kind {function}
	 * @param {number} r - красный цвет
	 * @param {number} g - зелёный цвет
	 * @param {number} b - синий цвет
	 * @param {number} a - альфа-канал
	 * @return {void}
	 */
	private setRgba (r : number, g : number, b: number, a : number) : void {
		this.red = r;
		this.green = g;
		this.blue = b;
		this.alfa = a;
	}

	/**
	 * valueOf - функция, возвращающая объектное представление класса.
	 *
	 * @kind {function}
	 * @return {IMaterialColor}
	 */
	valueOf () : IMaterialColor {
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
