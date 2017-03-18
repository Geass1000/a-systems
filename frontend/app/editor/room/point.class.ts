export class Point {
	constructor (public x : number, public y : number) { ; }
	valueOf () {
		return [this.x, this.y];
	}
	toString () {
		return `${this.x},${this.y}`;
	}
}
