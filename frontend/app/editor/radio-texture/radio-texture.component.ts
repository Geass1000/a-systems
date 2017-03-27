import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';

import { IWorkspace, ITexture } from '../../shared/interfaces/editor.interface';

@Component({
	moduleId: module.id,
  selector: 'as-editor-radio-texture',
	templateUrl: 'radio-texture.component.html',
  styleUrls: [ 'radio-texture.component.css' ]
})
export class RadioTextureComponent implements OnInit, OnDestroy {
	title = 'Home';
	private texture : string;
	@Input('width') width : number = 100;

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'isInit']) isInit$ : Observable<boolean>;
	private isInit : boolean;
	@select(['editor', 'workspace']) workspace$ : Observable<IWorkspace>;
	private workspace : IWorkspace;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions) {
	}
	ngOnInit () {
		this.subscription.push(this.isInit$.subscribe((data) => this.isInit = data));
		this.subscription.push(this.workspace$.subscribe((data) => this.workspace = data));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	onInitWorkspace () {
		this.ngRedux.dispatch(this.editorActions.updateWorkspaceSize(this.workspace.width, this.workspace.height));
		this.ngRedux.dispatch(this.editorActions.initWorkspace(true));
	}
}
