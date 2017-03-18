import { Component } from '@angular/core';

import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';

import { Room } from './room.class';
import { Point } from './point.class';

@Component({
	moduleId: module.id,
  selector: '[as-editor-room]',
	templateUrl: 'room.component.html',
  styleUrls: [ 'room.component.css' ]
})
export class RoomComponent  {
	title = 'Home';
	@select(['editor', 'selectElement']) selectElement : any;

	private room : Room;
	private rooms : Room[];

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions) {
		this.room = new Room ([
			new Point(1000, 1000),
			new Point(1200, 1000),
			new Point(1200, 1200),
			new Point(1000, 1200)
		], 20);
	}
	pointClick(el : any) {
		console.log(el);
		el.x = 800;
		this.room.updatePoints();
	}
}
