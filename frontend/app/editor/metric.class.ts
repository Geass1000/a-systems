import { Config } from '../config';

let Measure : Map<string, number> = new Map<string, number>([
	['m', 1],	['cm', 100], ['px', Config.scale]
]);
export { Measure };

export class Metric {
	private prevMeasure : string = null;
	private curMeasure : string = null;
	private defMeasure : string = null;
	constructor (curMeasure : string, defMeasure : string) {
		this.curMeasure = curMeasure;
		this.defMeasure = defMeasure;
		this.prevMeasure = curMeasure;
	}
	public convertToDef (num : number) {
		return this.convertor({ from : this.curMeasure, to : this.defMeasure }, num);
	}
	public convert (num : number) {
		return this.convertor({ from : this.prevMeasure, to : this.curMeasure }, num);
	}
	public setNewMeasure (newMeasure : string) {
		this.prevMeasure = this.curMeasure;
		this.curMeasure = newMeasure;
	}
	private convertor (dir : { from : string, to : string }, num : number) {
		if (!(dir.from && dir.to)) {
			return num;
		}

		let fromScale : number = Measure.get(dir.from);
		let toScale : number = Measure.get(dir.to);
		if (!(fromScale && toScale)) {
			return num
		};

		let cof : number = toScale / fromScale;
		return cof * num;
	}
	static convert (dir : { from : number, to : number }, num : number) {
		if (!(dir.from && dir.to)) return num;
		let cof : number = dir.to / dir.from;
		return cof * num;
	}
}
