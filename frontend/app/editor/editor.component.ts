import { Component } from '@angular/core';

import { UserService } from '../core/user.service';

import { SVGViewer } from './svg-viewer.class';

import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../actions/editor.actions';

@Component({
	moduleId: module.id,
  selector: 'as-editor',
	templateUrl: 'editor.component.html',
  styleUrls: [ 'editor.component.css' ]
})
export class EditorComponent  {
	private loc : string = location.href;

	private workspaceWidth : number;
	private workspaceHeight : number;

	private matrixTransform : string;

	private svgViewer : SVGViewer;

	constructor (private userService : UserService,
							 private ngRedux : NgRedux<any>,
						 	 private editorActions : EditorActions) {
		this.workspaceWidth = 2000;
		this.workspaceHeight = 2000;
		this.svgViewer = new SVGViewer(this.workspaceWidth, this.workspaceHeight);
		this.matrixTransform = this.svgViewer.getMatrix();
	}

	logout () {
		this.userService.logout();
	}

	/* Event Section */

	private prevX : number;
	private prevY : number;
	private startX : number;
	private startY : number;
	private selectWorkspace : boolean = false;
	@select(['editor', 'selectElement']) selectElement : any;

	onMouseDownWorkspace (event : any) {
		this.startX = event.clientX;
		this.startY = event.clientY;

		this.prevX = event.clientX;
		this.prevY = event.clientY;
		this.selectWorkspace = true;
		//console.log(event);
	}
	onMouseMoveWorkspace (event : any) {
		if (this.selectWorkspace) {
			let dX = event.clientX - this.prevX,
					dY = event.clientY - this.prevY;
			this.prevX = event.clientX;
			this.prevY = event.clientY;
			this.matrixTransform = this.svgViewer.translate(dX, dY);
			//console.log(this.matrixTransform);
		}
	}
	onMouseUpWorkspace (event : any) {
		if (this.startX === event.clientX && this.startY === event.clientY) {
			if (event.target.closest('.element')) {
				this.ngRedux.dispatch(this.editorActions.selectElement(true));
				console.log("Selected!");
			}
			else {
				this.ngRedux.dispatch(this.editorActions.selectElement(false));
				console.log("No Selected!");
			}
		}

		this.selectWorkspace = false;
	}
	onMouseOutWorkspace (event : any) {
		if (!event.target.closest('svg')) {
			this.selectWorkspace = false;
		}
	}
}
