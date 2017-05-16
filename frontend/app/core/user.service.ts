import { Injectable, OnDestroy } from '@angular/core';

import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';
import { UserActions } from '../actions/user.actions';

import { LoggerService } from './logger.service';

@Injectable()
export class UserService implements OnDestroy {
	private jwtHelper: JwtHelper;

	/* Redux */
	private subscription : Array<Subscription> = [];

	constructor (private ngRedux : NgRedux<any>,
							 private userActions : UserActions,
							 private logger : LoggerService) {
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
}
