
export class Material {
	private _type : string; // types: 'color' or 'texture'
	private _data : string; // data: color or urlTexture

	constructor ( ) {
		;
	}
	isType (type : string) : boolean {
		return this.type === type;
	}

	set type (data : string) {
		this._type = data;
	}
	get type () : string {
		return this._type;
	}
	set data (data : string) {
		this._data = data;
	}
	get data () : string {
		return this._data;
	}
}
