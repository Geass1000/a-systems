import { Injectable, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../actions/editor.actions';
import 'rxjs/add/observable/forkJoin';

import { DataLoadService } from './data-load.service';
import { LoggerService } from '../core/logger.service';

import { Workspace } from '../shared/lib/workspace.class';

@Injectable()
export class DataInitService implements OnDestroy {
	private isInit : Map<string, boolean> = new Map([
		['request', false], ['workspace', false]
	]);

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'project', 'workspace']) workspace$ : Observable<Workspace>;
	private workspace : Workspace;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private dataLoadService : DataLoadService,
						 	 private logger : LoggerService) {
		this.subscription.push(this.workspace$.subscribe((data) => {
 			this.workspace = data;
 		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	initData () {
		this.logger.info(`${this.constructor.name}:`, 'initData -', 'Data initialization...');
		this.initLoadData();
		this.initWorkspace();
	}

	isInitAll () {
		let values = Array.from(this.isInit.values());
		let isInitAllValues = values.every((data) => { return data; });
		this.logger.info(`${this.constructor.name}:`, 'Initialization - isInitAll -', isInitAllValues);
		if (isInitAllValues) {
			this.ngRedux.dispatch(this.editorActions.initProject(true));
		}
	}
	initLoadData () {
		if (this.isInit.get('request')) {
			return ;
		}
		Observable.forkJoin([
			this.dataLoadService.getItemCategories(),
			this.dataLoadService.getTextureTypes(),
			this.dataLoadService.getTextures(),
			this.dataLoadService.getItems()
		]).subscribe(
			(res) => {
				if (res[0].categories && res[0].categories.length !== 0) {
					this.ngRedux.dispatch(this.editorActions.addItemCategories(res[0].categories));
				}
				if (res[1].categories && res[1].categories.length !== 0) {
					this.ngRedux.dispatch(this.editorActions.addTextureCategories(res[1].categories));
				}
				if (res[2].textures && res[2].textures.length !== 0) {
					this.ngRedux.dispatch(this.editorActions.addTextures(res[2].textures));
				}
				if (res[3].items && res[3].items.length !== 0) {
					this.ngRedux.dispatch(this.editorActions.addItems(res[3].items));
				}

				this.logger.info(`${this.constructor.name}:`, 'Initialization - initLoadData - Request -', res);
				this.isInit.set('request', true);
				this.isInitAll();
			}
		);
	}
	initWorkspace () {
		let windowWidth  : number = document.documentElement.clientWidth,
				windowHeight : number = document.documentElement.clientHeight;
		let halfWindowWidth  : number = windowWidth / 2,
				halfWindowHeight : number = windowHeight / 2;
		let halfWorkspaceWidth  : number = this.workspace.width / 2,
				halfWorkspaceHeight : number = this.workspace.height / 2;
		let workspaceX = halfWindowWidth - halfWorkspaceWidth;
		let workspaceY = halfWindowHeight - halfWorkspaceHeight;
		this.ngRedux.dispatch(this.editorActions.translateWorkspace([workspaceX, workspaceY]));

		this.logger.info(`${this.constructor.name}:`, `Initialization - initWorkspace - X - ${workspaceX} - Y - ${workspaceY}`);
		this.isInit.set('workspace', true);
		this.isInitAll();
	}
}
