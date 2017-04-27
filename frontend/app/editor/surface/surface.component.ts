import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';

import { Point } from '../../shared/lib/point.class';

@Component({
	moduleId: module.id,
  selector: '[as-editor-surface]',
	templateUrl: 'surface.component.html',
  styleUrls: [ 'surface.component.css' ]
})
export class RoomComponent implements OnInit, OnDestroy {
	title = 'Home';

	private surface : Array<Point>;

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'state', 'selectElement']) selectElement$ : Observable<boolean>;
	private selectElement : boolean;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions) {
		this.surface = [
			new Point({ x: 0, y : 0}),
			new Point({ x: 0, y : 500}),
			new Point({ x: 500, y : 500}),
			new Point({ x: 500, y : 0})
		];
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
	}
}
