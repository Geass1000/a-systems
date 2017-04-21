import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
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
export class RoomComponent implements OnInit, OnDestroy {
	title = 'Home';

	private room : Room;

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'all', 'selectElement']) selectElement$ : Observable<boolean>;
	private selectElement : boolean;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions) {
		this.room = new Room ([
			new Point(1000, 1000),
			new Point(1200, 1000),
			new Point(1200, 1200),
			new Point(1000, 1200)
		], 20);
	}
	ngOnInit () {
		this.subscription.push(this.selectElement$.subscribe((data) => this.selectElement = data));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}
	pointClick (el : any) {
		console.log(this.selectElement);
		console.log(el);
		el.x = 800;
		this.room.updatePoints();
	}
}
