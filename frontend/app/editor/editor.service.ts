import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Config } from '../config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class EditorService {
	private headers = new Headers({ 'Content-Type': 'application/json' });
	private usersUrl = 'api/users';
	private authUrl = 'api/auth';

	constructor (private http : Http) { ;	}

	getTextures (type : string) {
		let query : string = type ? `?type=${type}` : '';
		return this.http.get(Config.serverUrl + this.usersUrl + query, { headers : this.headers })
										.map((resp) => {
											return resp.json();
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
