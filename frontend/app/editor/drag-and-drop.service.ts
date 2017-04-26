import { Injectable, OnDestroy } from '@angular/core';

import { NgRedux } from '@angular-redux/store';
import { EditorActions } from '../actions/editor.actions';

import { LoggerService } from '../core/logger.service';

@Injectable()
export class DragAndDropService implements OnDestroy {
	private startX : number;
	private startY : number;
	private shiftX : number;
	private shiftY : number;

	private precision : number = 3;

	private isWorkspace : boolean;
	private isCaptured : boolean;
	private avatar : boolean;

	/* Redux */
	private subscription : any[] = [];

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private logger : LoggerService) {
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	initData () {
		this.isWorkspace = false;
		this.isCaptured = false;
		this.avatar = false;
		this.ngRedux.dispatch(this.editorActions.toggleMove(false));
	}

	detectLeftButton (event : any) : boolean {
		if ('buttons' in event) {
			return event.buttons === 1;
		}
		return (event.which || event.button) === 1;
	}

	onMouseDown (event : any) {
		if (!this.detectLeftButton(event)) {
			return false;
		}

		this.initData();

		let el : any = event.target.closest('.draggable');
		this.isCaptured = true;
		this.logger.info(`${this.constructor.name}:`, 'onMouseDown - el -', el);

		if (!el) {
			this.isWorkspace = true;
		}

		this.startX = event.clientX;
		this.startY = event.clientY;
		this.shiftX = this.startX;
		this.shiftY = this.startY;

		event.preventDefault();
	}
	onMouseMove (event : any) {
		if (!this.isCaptured) {
			return;
		}
		if (!this.detectLeftButton(event)) {
			this.isCaptured = false;
			this.ngRedux.dispatch(this.editorActions.toggleMove(false));
			return;
		}
		if (!this.avatar) {
			if (Math.abs(event.clientX - this.startX) < this.precision &&
					Math.abs(event.clientY - this.startY) < this.precision) {
				return false;
			}
			this.ngRedux.dispatch(this.editorActions.toggleMove(true));
			this.avatar = true;
		}

		let dX = event.clientX - this.shiftX;
		let dY = event.clientY - this.shiftY;
		this.shiftX = event.clientX;
		this.shiftY = event.clientY;

		if (this.isWorkspace) {
			this.ngRedux.dispatch(this.editorActions.translateWorkspace(dX, dY));
			// Data sending to redux
		}
		event.preventDefault();
	}
	onMouseUp (event : any) {
		this.initData();
		event.preventDefault();
	}
}
