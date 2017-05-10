import { IRgba, IHsla, IHex } from './color.class';

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

export class ColorModel {
	/**
	 * typeDefinition - функция, выполняющая определение типа цветовой модели переданного
	 * значения. Если строка не соответствует ни одной цветовой модели, возвращается null.
	 *
	 * @kind {function}
	 * @param {string} str - строка с цветом
	 * @return {string} - цветовая модель
	 */
	static typeDefinition (str : string) : string {
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
	 * @param {IHex} data - 16-е значение цвета
	 * @return {IRgba}
	 */
	static hexToRgba (data : IHex) : IRgba {
		let rgx : RegExp = /^([a-f\d])([a-f\d])([a-f\d])$/;
		let hex = data.hex.replace(rgx, (m, f1, f2, f3) => {
			return f1 + f1 + f2 + f2 + f3 + f3;
		});
		rgx = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/;
		let result : RegExpMatchArray = hex.match(rgx);
		return {
			red : parseInt(result[1], 16),
			green : parseInt(result[2], 16),
			blue : parseInt(result[3], 16),
			alfa : data.alfa
		};
	}

	/**
	 * rgbToHex - функция, выполняющая преобразование из одной цветовой модели (из rgb)
	 * в другую (в hex).
	 *
	 * @kind {function}
	 * @param {IRgba} data - rgba цвет
	 * @param {number} r - красный цвет
	 * @param {number} g - зелёный цвет
	 * @param {number} b - синий цвет
	 * @return {IHex}
	 */
	static rgbaToHex (data : IRgba) : IHex {
		let rgbArr : Array<number> = [data.red, data.green, data.blue];
		let hex : string;
		hex = rgbArr.map((color) => {
			let base16 : string = color.toString(16);
			return color < 16 ? base16 + base16 : base16;
		}).join('');
		return {
			hex : hex,
			alfa : data.alfa
		};
	}

	/**
	 * hslaToRgba - функция, выполняющая преобразование из одной цветовой модели (из hsla)
	 * в другую (в rgba).
	 *
	 * @kind {function}
	 * @param {IHsla} data - hslt цвет
	 * @return {IRgba}
	 */
	static hslaToRgba (data : IHsla) : IRgba {
		let Q : number = data.lightness < 0.5 ? data.lightness * (1 + data.saturation)
																					: data.lightness + data.saturation - data.lightness * data.saturation;
		let P : number = 2 * data.lightness - Q;

		let Hk : number = data.hue / 360;

		let Tr : number = Hk + 1 / 3;
		let Tg : number = Hk;
		let Tb : number = Hk - 1 / 3;

		return {
			red : Math.round(ColorModel.hueRgb(Q, P, Tr) * 255),
			green : Math.round(ColorModel.hueRgb(Q, P, Tg) * 255),
			blue : Math.round(ColorModel.hueRgb(Q, P, Tb) * 255),
			alfa : data.alfa
		};
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
	static rgbaToHsla (data : IRgba) : IHsla {
		let r : number = data.red / 255;
		let g : number = data.green / 255;
		let b : number = data.blue / 255;
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

		return {
			hue : Math.round(h),
			saturation : +(s * 100).toFixed(2),
			lightness : +(l * 100).toFixed(2),
			alfa : data.alfa
		};
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
	static hueRgb (q : number, p : number, t : number) : number {
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
}
