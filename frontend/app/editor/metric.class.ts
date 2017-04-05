import { Config } from '../config';

let Measure : Map<string, number> = new Map<string, number>([
	['m', 1],	['cm', 100], ['px', Config.scale]
]);
export { Measure };

export class Metric {
	static convert (dir : { from : number, to : number }, num : number) {
		let cof : number = dir.to / dir.from;
		return cof * num;
	}
}
