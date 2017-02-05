import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { UserLogin } from './user-login';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {
	headers = new Headers({ 'Content-Type': 'application/json' });
	serverUrl = 'http://localhost:3005/';
	usersUrl = 'api/users';
	sessionUrl = 'api/session';

	constructor (private http : Http) { ; }

	addUser (user : UserLogin) {
		let body = JSON.stringify(user);

		return this.http.post(this.serverUrl + this.usersUrl, body, this.headers)
										.map((resp) => { ; })
										.catch(this.handleError);
	}

	handleError (error : any) {
		return Observable.throw(error);
	}
}
