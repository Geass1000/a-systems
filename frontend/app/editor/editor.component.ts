import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../actions/editor.actions';

import { LoggerService } from '../core/logger.service';
import { DragAndDropService } from './drag-and-drop.service';

import { IWorkspaceCoord } from '../shared/interfaces/editor.interface';
import { MatrixTransform } from './matrix-transform.class';

@Component({
	moduleId: module.id,
  selector: 'as-editor',
	templateUrl: 'editor.component.html',
  styleUrls: [ 'editor.component.css' ]
})
export class EditorComponent implements OnInit, OnDestroy {
	private loc : string = '';

	private workspaceWidth : number;
	private workspaceHeight : number;
	private matrixTransform : string;
	private workspaceMatrix : MatrixTransform;
	private workspaceX : number;
	private workspaceY : number;

	private prevX : number;
	private prevY : number;
	private startX : number;
	private startY : number;
	private selectWorkspace : boolean = false;

	private subscription : any[] = [];
	@select(['editor', 'state', 'selectElement']) selectElement$ : Observable<boolean>;
	private selectElement : boolean;
	@select(['editor', 'state', 'isInitProject']) isInitProject$ : Observable<boolean>;
	private isInitProject : boolean;
	@select(['editor', 'state', 'workspaceCoord']) workspaceCoord$ : Observable<IWorkspaceCoord>;
	private workspaceCoord : IWorkspaceCoord;

	@select(['editor', 'control', 'open']) modalOpen$ : Observable<boolean>;

	constructor (private ngRedux : NgRedux<any>,
						 	 private editorActions : EditorActions,
						 	 private logger : LoggerService,
						 	 private dragAndDropService : DragAndDropService) {
		this.loc = location.href;
		this.workspaceWidth = 2000;
		this.workspaceHeight = 2000;
		this.initWorkspace();
	}
	ngOnInit () {
		this.subscription.push(this.selectElement$.subscribe((data) => this.selectElement = data));
		this.subscription.push(this.isInitProject$.subscribe((data) => this.isInitProject = data));
		this.subscription.push(this.workspaceCoord$.subscribe((data) => {
			this.workspaceCoord = data;
			this.matrixTransform = this.workspaceMatrix.setCoord(this.workspaceCoord.x, this.workspaceCoord.y);
			//this.logger.info(`${this.constructor.name}:`, 'ngOnInit - Redux - workspaceCoord -', this.workspaceCoord);
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	initWorkspace () {
		let windowWidth  : number = document.documentElement.clientWidth,
				windowHeight : number = document.documentElement.clientHeight;
		let halfWindowWidth  : number = windowWidth / 2,
				halfWindowHeight : number = windowHeight / 2;
		let halfWorkspaceWidth  : number = this.workspaceWidth / 2,
				halfWorkspaceHeight : number = this.workspaceHeight / 2;
		this.workspaceX = halfWindowWidth - halfWorkspaceWidth;
		this.workspaceY = halfWindowHeight - halfWorkspaceHeight;
		this.workspaceMatrix = new MatrixTransform (this.workspaceX, this.workspaceY);
		this.matrixTransform = this.workspaceMatrix.getMatrix();
	}

	/* Event Section */
	// Depricated
	onMouseDownWorkspace (event : any) {
		this.startX = event.clientX;
		this.startY = event.clientY;

		this.prevX = event.clientX;
		this.prevY = event.clientY;
		let el = event.target.closest('.element');
		this.selectWorkspace = !(this.selectElement && el && el.classList.contains('selected'));
		// console.log(event);
	}
	onMouseMoveWorkspace (event : any) {
		if (this.selectWorkspace) {
			let dX = event.clientX - this.prevX,
					dY = event.clientY - this.prevY;
			this.prevX = event.clientX;
			this.prevY = event.clientY;
			this.matrixTransform = this.workspaceMatrix.translate(dX, dY);
			// console.log(this.matrixTransform);
		}
	}
	onMouseUpWorkspace (event : any) {
		if (this.startX === event.clientX && this.startY === event.clientY) {
			if (event.target.closest('.element')) {
				this.ngRedux.dispatch(this.editorActions.selectElement(true));
				console.log('Selected!');
			}	else {
				this.ngRedux.dispatch(this.editorActions.selectElement(false));
				console.log('No Selected!');
			}
		}

		this.selectWorkspace = false;
	}
	onMouseOutWorkspace (event : any) {
		if (!event.relatedTarget || !event.relatedTarget.closest('svg')) {
			this.selectWorkspace = false;
		}
	}
}
