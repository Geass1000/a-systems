import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Config } from '../config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../actions/editor.actions';

@Injectable()
export class EditorService {
	private headers = new Headers({ 'Content-Type': 'application/json' });
	private texturUrl = 'api/texture';

	constructor (private http : Http,
							 private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions) {
	}

	getTextures (type : string) {
		let query : string = type ? `?type=${type}` : '';
		return this.http.get(Config.serverUrl + this.texturUrl + query, { headers : this.headers })
										.map((resp) => {
											let jResp = resp.json();
											this.ngRedux.dispatch(this.editorActions.addTextures(jResp.textures));
											return jResp;
										})
										.catch(this.handleError);
	}
	handleError (error : any) {
		let message : string = error._body || '';
		let tmp : any = JSON.parse(message);
		message = tmp ? tmp.message : '';
		return Observable.throw(message);
	}
}
