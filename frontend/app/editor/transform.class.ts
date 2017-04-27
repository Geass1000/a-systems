
interface ITransform {
	x : number;
	y : number;
	sx : number;
	sy : number;
}

/**
 * Матрица трансформаций. Основные функции:
 * 1. Перемечение по области;
 * 2. Масштабирование области;
 *
 */
export class Transform {
	private matrix : number[] = [1, 0, 0, 1, 0, 0];

	constructor (obj ?: ITransform) {
		if (obj) {
			this.matrix[0] = obj.sx || this.matrix[0];
			this.matrix[3] = obj.sy || this.matrix[3];
			this.matrix[4] = obj.x || this.matrix[4];
			this.matrix[5] = obj.y || this.matrix[5];
		}
	}
	setCoord (x : number, y : number) {
		this.matrix[4] = x || 0;
		this.matrix[5] = y || 0;
		return this.getMatrix();
	}

	getMatrix () {
		return `matrix(${this.matrix.join(',')})` ;
	}
	translate (dx : number, dy : number) {
		this.matrix[4] += dx || 0;
		this.matrix[5] += dy || 0;
		return this.getMatrix();
	}
	scale (ds : number) {
		this.matrix[0] = ds || this.matrix[0];
		this.matrix[3] = ds || this.matrix[3];
		return this.getMatrix();
	}
}
