import { Component } from '@angular/core';

import { UserService } from '../core/user.service';

@Component({
	moduleId: module.id,
  selector: 'as-editor',
	templateUrl: 'editor.component.html',
  styleUrls: [ 'editor.component.css' ]
})
export class EditorComponent  {
	title = 'Editor';
	private workspaceWidth : number = 8000;
	private workspaceHeight : number = 8000;

	private viewer = { x : 0,	y : 0, w : this.workspaceWidth,	h : this.workspaceHeight };

	constructor (private userService : UserService) {
	}

	getViewer () {
		return `${this.viewer.x} ${this.viewer.y} ${this.viewer.w} ${this.viewer.h}`;
	}

	logout () {
		this.userService.logout();
	}

	onMouseDown (event) {
		console.log(event);
	}
}
