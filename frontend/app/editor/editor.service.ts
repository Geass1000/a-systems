import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Config } from '../config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';

import { NgRedux } from '@angular-redux/store';
import { EditorActions } from '../actions/editor.actions';

import { HttpService } from '../core/http.service';
import { LoggerService } from '../core/logger.service';

@Injectable()
export class EditorService {
	private headers = new Headers({ 'Content-Type': 'application/json' });
	private texturUrl = 'api/texture';
	private texturTypeUrl = 'api/texture/type';
	private itemCategoryUrl = 'api/item/category';

	constructor (private http : Http,
							 private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private httpService : HttpService,
						 	 private logger : LoggerService) {
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
