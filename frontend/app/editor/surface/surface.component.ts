import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';

import { LoggerService } from '../../core/logger.service';

import { Surface } from '../../shared/lib/surface.class';
//import { Point } from '../../shared/lib/point.class';

@Component({
	moduleId: module.id,
  selector: '[as-editor-surface]',
	templateUrl: 'surface.component.html',
  styleUrls: [ 'surface.component.css' ]
})
export class RoomComponent implements OnInit, OnDestroy {

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'project', 'surfaces']) surfaces$ : Observable<Array<Surface>>;
	private surfaces : Array<Surface>;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
							 private logger : LoggerService) {
	}
	ngOnInit () {
		this.subscription.push(this.surfaces$.subscribe((data) => {
			this.surfaces = data;
			this.logger.info(`${this.constructor.name}:`, 'ngOnInit - Redux - surfaces -', this.surfaces);
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}
	pointClick (el : any) {
		console.log(el);
	}
}
