export interface IMap<T> {
	[ key : string ] : T;
}

export function mapToArray<T>(map : IMap<any>) : T[] {
	let arr : T[] = [];
	for (let prop in map) {
		arr.push(map[prop]);
	}
	return arr;
}
