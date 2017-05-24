
export class HelperClass {

	/**
	 * prepareData - функция, выполняющая: проверку данных на соответствие нормальному
	 * числу, на вхождение числа в диапазон.
	 *
	 * @function
	 * @param {number} data - значение цвета
	 * @param {number} min - минимальное значение цвета
	 * @param {number} max - максимальное значение цвета
	 * @return {number}
	 */
	static prepareData (data : number, min ?: number, max ?: number) : number {
		data = isFinite(data) ? data : 0;
		if (min) {
			data = data < min ? min : data;
		}
		if (max) {
			data = data > max ? max : data;
		}
		return data;
	}
}
