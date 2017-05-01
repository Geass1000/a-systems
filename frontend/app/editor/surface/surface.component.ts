import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';

import { LoggerService } from '../../core/logger.service';

import { Surface } from '../../shared/lib/surface.class';
import { IElement } from '../../shared/interfaces/editor.interface';
//import { Point } from '../../shared/lib/point.class';

@Component({
	moduleId: module.id,
  selector: '[as-editor-surface]',
	templateUrl: 'surface.component.html',
  styleUrls: [ 'surface.component.css' ]
})
export class SurfaceComponent implements OnInit, OnDestroy {

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'state', 'activeElements']) activeElements$ : Observable<Array<IElement>>;
	private activeElements : Array<IElement>;
	@select(['editor', 'project', 'surfaces']) surfaces$ : Observable<Array<Surface>>;
	private surfaces : Array<Surface>;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
							 private logger : LoggerService) {
	}
	ngOnInit () {
		this.subscription.push(this.activeElements$.subscribe((data) => {
			this.activeElements = data;
			this.logger.info(`${this.constructor.name}:`, 'ngOnInit - Redux - activeElements -', this.activeElements);
		}));
		this.subscription.push(this.surfaces$.subscribe((data) => {
			this.surfaces = data;
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}
	isActiveSurface (index : number) {
		if (!this.activeElements || !this.activeElements.length) {
			return false;
		}
		return this.activeElements[0].type === 'surface' && this.activeElements[0].id === index;
	}
}
