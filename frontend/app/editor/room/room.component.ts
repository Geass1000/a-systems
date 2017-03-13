import { Component } from '@angular/core';

class IPoint {
	constructor (private x : number, private y : number) { ; }
	valueOf () {
		return [this.x, this.y];
	}
	toString () {
		return `${this.x},${this.y}`;
	}
}

interface IRoom {
	floor : IPoint[]
}

@Component({
	moduleId: module.id,
  selector: '[as-editor-room]',
	templateUrl: 'room.component.html',
  styleUrls: [ 'room.component.css' ]
})
export class RoomComponent  {
	title = 'Home';

	private room : IRoom = {
		floor : []
	};

	constructor () {
		this.room.floor = [
			new IPoint(1000, 1000),
			new IPoint(1200, 1000),
			new IPoint(1200, 1200),
			new IPoint(1000, 1200)
		];
	}

}
