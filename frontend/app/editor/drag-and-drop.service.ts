import { Injectable, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../actions/editor.actions';

import { LoggerService } from '../core/logger.service';

@Injectable()
export class DragAndDropService implements OnDestroy {
	private startX : number;
	private startY : number;
	private shiftX : number;
	private shiftY : number;

	private isWorkspace : boolean;

	/* Redux */
	private subscription : any[] = [];

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private logger : LoggerService) {
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	onMouseDown (event : any) {
		if (event.button !== 0) {
			return false;
		}

		let el : any = event.target.closest('.draggable');
		if (el) {
			this.isWorkspace = false;
		} else {
			this.isWorkspace = true;
		}

		this.startX = event.clientX;
		this.startY = event.clientY;
		this.shiftX = this.startX;
		this.shiftY = this.startY;

		event.preventDefault();
	}
	onMouseMove (event : any) {
		if (this.isWorkspace) {
			let dX = event.clientX - this.shiftX;
			let dY = event.clientY - this.shiftY;
			this.shiftX = event.clientX;
			this.shiftY = event.clientY;
			this.ngRedux.dispatch(this.editorActions.translateWorkspace(dX, dY));
			// Data sending to redux
		}
		event.preventDefault();
	}
	onMouseUp (event : any) {
		if (this.isWorkspace) {
			this.isWorkspace = false;
		}
		event.preventDefault();
	}
}
