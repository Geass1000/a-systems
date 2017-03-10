
/**
 * Просмоторщик SVG полотна. Основные функции:
 * 1. Перемечение по области;
 * 2. Масштабирование;
 *
 */
export class SVGViewer {
	private matrix : Array<number> = [1, 0, 0, 1, 0, 0];

	private workspaceX : number;
	private workspaceY : number;

	constructor (private workspaceWidth : number,
							 private workspaceHeight : number) {
		let windowWidth  : number = document.documentElement.clientWidth,
				windowHeight : number = document.documentElement.clientHeight;
		let halfWindowWidth  : number = windowWidth / 2,
				halfWindowHeight : number = windowHeight / 2;
		let halfWorkspaceWidth  : number = this.workspaceWidth / 2,
				halfWorkspaceHeight : number = this.workspaceHeight / 2;
		this.workspaceX = halfWindowWidth - halfWorkspaceWidth;
		this.workspaceY = halfWindowHeight - halfWorkspaceHeight;
		this.translate(this.workspaceX, this.workspaceY);
	}

	getMatrix () {
		return `matrix(${this.matrix.join(',')})` ;
	}
	translate (x : number, y : number) {
		this.matrix[4] += x || 0;
		this.matrix[5] += y || 0;
		return this.getMatrix();
	}
	scale (s : number) {
		this.matrix[0] = s || this.matrix[0];
		this.matrix[3] = s || this.matrix[3];
		return this.getMatrix();
	}
}
