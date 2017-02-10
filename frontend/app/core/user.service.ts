import { Injectable } from '@angular/core';

import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class UserService {
	userName : string = '';
	jwtHelper: JwtHelper = new JwtHelper();

	constructor () {
		this.setUserData();
	}

	getUserName () {
		return this.userName;
	}
	setUserData () {
		if (this.loggedIn()) {
			let token = localStorage.getItem('id_token');
			let decodeToken = this.jwtHelper.decodeToken(token);

			this.userName = decodeToken.name;
		}
		else {
			this.userName = '';
		}
	}

	loggedIn () {
		return tokenNotExpired();
	}

	logout () {
		localStorage.removeItem('id_token');
		this.setUserData();
	}
}