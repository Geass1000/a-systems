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

import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../actions/editor.actions';

import { HttpService } from '../core/http.service';

@Injectable()
export class EditorService {
	private headers = new Headers({ 'Content-Type': 'application/json' });
	private texturUrl = 'api/texture';

	constructor (private http : Http,
							 private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private httpService : HttpService) {
	}

	getTextures (type : string) {
		let query : string = type ? `?type=${type}` : '';
		return this.http.get(Config.serverUrl + this.texturUrl + query, { headers : this.headers })
										.map((resp : Response) => {
											let jResp = resp.json() || {};
											this.ngRedux.dispatch(this.editorActions.addTextures(jResp.textures));
											return jResp;
										})
										.retryWhen((errorObs) => this.httpService.retry(errorObs))
										.catch(this.httpService.handleError);
	}
}
