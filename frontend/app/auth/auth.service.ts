import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Location } from '@angular/common';

import { UserLogin } from './user-login';
import { UserSignup } from './user-signup';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {
	private headers = new Headers({ 'Content-Type': 'application/json' });
	private serverUrl = 'http://localhost:3005/';
	private usersUrl = 'api/users';
	private sessionUrl = 'api/session';

	constructor (private http : Http,
							 private location : Location) { ;	}

	addUser (user : UserSignup) {
		let body = JSON.stringify(user);

		return this.http.post(this.serverUrl + this.usersUrl, body, { headers : this.headers })
										.map((resp) => {
											localStorage.setItem('id_token', resp.json().token);
										})
										.catch(this.handleError);
	}

	login (user : UserLogin) {
		let body = JSON.stringify(user);

		return this.http.post(this.serverUrl + this.sessionUrl, body, { headers : this.headers })
										.map((resp) => {
											localStorage.setItem('id_token', resp.json().token);
										})
										.catch(this.handleError);
	}
	logout () {
		localStorage.removeItem('id_token');
		this.location.back();
	}

	handleError (error : any) {
		return Observable.throw(error);
	}
}
