import { Config } from '../config';

enum Measure {
	px = Config.scale,
  cm = 100,
	m = 1
}
export { Measure };

export class Metric {
	static convert (dir : { from : number, to : number }, num : number) {
		let cof : number = dir.to / dir.from;
		return cof * num;
	}
}
