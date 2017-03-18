import { Point } from './point.class';

export class Room {
	public viewPts : string;
	public pts : Array<Point>;
	public wall : number;

	constructor (pts : Array<Point>, wall : number) {
		this.pts = pts;
		this.wall = wall;

		this.updatePoints();
	}
	updatePoints () {
		this.viewPts = this.pts.join(' ');
	}
	valueOf () {
		return this.pts;
	}
	toString () {
		return this.pts.join(' ');
	}
}
