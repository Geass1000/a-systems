import { Injectable, OnDestroy } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Config } from '../config';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../actions/editor.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';

import { HttpService } from '../core/http.service';
import { LoggerService } from '../core/logger.service';

import { Workspace } from '../shared/lib/workspace.class';

@Injectable()
export class DataLoadService implements OnDestroy {
	private headers = new Headers({ 'Content-Type': 'application/json' });
	private texturUrl = 'api/texture';
	private texturTypeUrl = 'api/texture/type';
	private itemCategoryUrl = 'api/item/category';

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'project', 'workspace']) workspace$ : Observable<Workspace>;
	private workspace : Workspace;

	constructor (private http : Http,
							 private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private httpService : HttpService,
						 	 private logger : LoggerService) {
		this.subscription.push(this.workspace$.subscribe((data) => {
 			this.workspace = data;
 		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	initData () {
		this.initWorkspace();
		this.isInit();
	}

	isInit () {
		if (true) {
			this.ngRedux.dispatch(this.editorActions.initProject(true));
		}
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
		this.logger.info(`${this.constructor.name}:`, `initWorkspace - X - ${workspaceX} - Y - ${workspaceY}`);
		this.ngRedux.dispatch(this.editorActions.translateWorkspace(workspaceX, workspaceY));
	}

	getTextures (type : string) : Observable<any> {
		let query : string = type ? `?type=${type}` : '';
		return this.http.get(Config.serverUrl + this.texturUrl + query, { headers : this.headers })
										.map((resp : Response) => {
											let jResp = resp.json() || {};
											this.logger.info(`${this.constructor.name}:`, 'getTextures -', `status = ${resp.status} -`, jResp);
											return jResp;
										})
										.retryWhen((errorObs) => this.httpService.retry(errorObs))
										.catch(this.httpService.handleError);
	}
	getTextureTypes () : Observable<any> {
		return this.http.get(Config.serverUrl + this.texturTypeUrl, { headers : this.headers })
										.map((resp : Response) => {
											let jResp = resp.json() || {};
											this.logger.info(`${this.constructor.name}:`, 'getTextureTypes -', `status = ${resp.status} -`, jResp);
											return jResp;
										})
										.retryWhen((errorObs) => this.httpService.retry(errorObs))
										.catch(this.httpService.handleError);
	}
	getItemCategories () : Observable<any> {
		return this.http.get(Config.serverUrl + this.itemCategoryUrl, { headers : this.headers })
										.map((resp : Response) => {
											let jResp = resp.json() || {};
											this.logger.info(`${this.constructor.name}:`, 'getItemCategories -', `status = ${resp.status} -`, jResp);
											return jResp;
										})
										.retryWhen((errorObs) => this.httpService.retry(errorObs))
										.catch(this.httpService.handleError);
	}
}
