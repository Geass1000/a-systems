
/**
 * Матрица трансформаций. Основные функции:
 * 1. Перемечение по области;
 * 2. Масштабирование области;
 *
 */
export class MatrixTransform {
	private matrix : number[] = [1, 0, 0, 1, 0, 0];

	constructor (x ?: number, y ?: number, sx ?: number, sy ?: number) {
		this.matrix[0] = sx || this.matrix[0];
		this.matrix[3] = sy || this.matrix[3];
		this.matrix[4] = x || this.matrix[4];
		this.matrix[5] = y || this.matrix[5];
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
