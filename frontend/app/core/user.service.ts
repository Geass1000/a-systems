import { Injectable, OnDestroy } from '@angular/core';
import { Headers, Response } from '@angular/http';

import { AuthHttp, tokenNotExpired, JwtHelper } from 'angular2-jwt';

import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';
import { UserActions } from '../actions/user.actions';

import { Config } from '../config';

import { LoggerService } from './logger.service';
import { HttpService } from '../core/http.service';

@Injectable()
export class UserService implements OnDestroy {
	private jwtHelper: JwtHelper;
	private headers = new Headers({ 'Content-Type': 'application/json' });

	/* Redux */
	private subscription : Array<Subscription> = [];

	constructor (private authHttp : AuthHttp,
							 private ngRedux : NgRedux<any>,
							 private userActions : UserActions,
							 private logger : LoggerService,
						 	 private httpService : HttpService) {
		this.init();
	}
	init () {
		this.jwtHelper = new JwtHelper();
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	/**
	 * login - функция, выполняющая вход пользователя в систему.
	 * Выполняет распаковку токена и установку пользовательских данных в хранилище.
	 *
	 * @kind {function}
	 * @param {string} token - jwt-токен
	 * @return {void}
	 */
	login (token : string) : void {
		localStorage.setItem('token', token);
		try {
			let decodeToken = this.jwtHelper.decodeToken(token);
			this.logger.info(`${this.constructor.name} - setToken:`, 'decodeToken -', decodeToken);
			this.ngRedux.dispatch(this.userActions.setUserId(decodeToken.id));
			this.ngRedux.dispatch(this.userActions.setUserName(decodeToken.name));
		} catch (error) {
			this.logger.warn(`${this.constructor.name} - setToken:`, 'Token isn\'t exist');
		}
	}

	/**
	 * logout - функция, выполняющая выход пользователя из системы.
	 * Выполняет удаление пользовательских данных из хранилища.
	 *
	 * @kind {function}
	 * @return {void}
	 */
	logout () : void {
		localStorage.removeItem('token');
		this.ngRedux.dispatch(this.userActions.resetStoreUser());
	}

	/**
	 * loggedIn - функция, выполняющая проверку, находится ли пользователь в системе.
	 *
	 * @kind {function}
	 * @return {boolean}
	 */
	loggedIn () : boolean {
		return tokenNotExpired('token');
	}

	getUserId (userId : string) {
		return this.authHttp.get(Config.serverUrl + Config.usersUrl + userId, { headers : this.headers })
			.map((resp : Response) => {
				let jResp = resp.json() || {};
				this.logger.info(`${this.constructor.name} - addUser:`, `status = ${resp.status} -`, jResp);
				return jResp;
			})
			.retryWhen((errorObs) => this.httpService.retry(errorObs))
			.catch(this.httpService.handleError);
	}
}
