import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Location } from '@angular/common';

import { Config } from '../config';
import { UserService } from '../core/user.service';
import { LoggerService } from '../core/logger.service';

import { UserLogin, UserReset, UserSignup } from './user';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {
	private headers = new Headers({ 'Content-Type': 'application/json' });
	private usersUrl = 'api/users';
	private authUrl = 'api/auth';

	constructor (private http : Http,
							 private location : Location,
						 	 private userService : UserService,
						 	 private logger : LoggerService) { ;	}

	addUser (user : UserSignup) {
		let body = JSON.stringify(user);

		return this.http.post(Config.serverUrl + this.usersUrl, body, { headers : this.headers })
										.map((resp) => {
											let jResp = resp.json() || {};
											this.logger.info(`${this.constructor.name} - addUser:`, `status = ${resp.status} -`, jResp);
											return jResp;
										})
										.catch(this.handleError);
	}

	login (user : UserLogin) {
		let body = JSON.stringify(user);

		return this.http.post(Config.serverUrl + this.authUrl, body, { headers : this.headers })
										.map((resp) => {
											let jResp = resp.json() || {};
											this.logger.info(`${this.constructor.name} - login:`, `status = ${resp.status} -`, jResp);
											return jResp;
										})
										.catch(this.handleError);
	}

	reset (user : UserReset) {
		let body = JSON.stringify(user);

		return this.http.post(Config.serverUrl + this.authUrl, body, { headers : this.headers })
										.map((resp) => {
											let jResp = resp.json() || {};
											this.logger.info(`${this.constructor.name} - addUser:`, `status = ${resp.status} -`, jResp);
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
