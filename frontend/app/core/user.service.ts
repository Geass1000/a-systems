import { Injectable, OnDestroy } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { AuthHttp, tokenNotExpired, JwtHelper } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';
import { UserActions } from '../actions/user.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Config } from '../config';

import { LoggerService } from './logger.service';
import { HttpService } from './http.service';

import { ILogin, ISignup, IRAuth } from '../shared/interfaces/auth.interface';

@Injectable()
export class UserService implements OnDestroy {
	private jwtHelper: JwtHelper;
	private headers = new Headers({ 'Content-Type': 'application/json' });

	/* Redux */
	private subscription : Array<Subscription> = [];

	constructor (private http : Http,
							 private authHttp : AuthHttp,
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
	 * login - функция-метод, выполняет вход пользователя в систему.
	 * Выполняет распаковку токена и установку пользовательских данных в хранилище.
	 *
	 * @kind {function}
	 * @param {string} token - jwt-токен
	 * @return {void}
	 */
	login (token ?: string) : void {
		if (!token && !this.loggedIn()) {
			this.logger.info(`${this.constructor.name} - login:`, 'User isn\'t logined!');
			return ;
		}
		token = token ? token : localStorage.getItem('token');
		localStorage.setItem('token', token);
		try {
			let decodeToken = this.jwtHelper.decodeToken(token);
			this.logger.info(`${this.constructor.name} - login:`, 'decodeToken -', decodeToken);
			this.ngRedux.dispatch(this.userActions.setUserId(decodeToken._id));
			this.ngRedux.dispatch(this.userActions.setUserName(decodeToken.name));
		} catch (error) {
			this.logger.warn(`${this.constructor.name} - login:`, 'Token isn\'t exist');
		}
	}

	/**
	 * logout - функция-метод, выполняет выход пользователя из системы.
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
	 * loggedIn - функция-метод, выполняет проверку: "Находится ли пользователь в системе?".
	 *
	 * @kind {function}
	 * @return {boolean}
	 */
	loggedIn () : boolean {
		try {
			let confirm : boolean = tokenNotExpired('token');
			return confirm;
		} catch (error) {
			return false;
		}
	}

	/**
	 * getUser - функция-запрос, выполняет получение данных пользователя от сервера.
	 *
	 * @kind {function}
	 * @param {string} userName - имя пользователя (уникальное, регистронезависимое)
	 * @return {void}
	 */
	getUser (userName : string) : Observable<any> {
		return this.authHttp.get(Config.serverUrl + Config.usersUrl + userName, { headers : this.headers })
			.map<Response, any>((resp : Response) => {
				let jResp = resp.json() || {};
				this.logger.info(`${this.constructor.name} - getUserId:`, `status = ${resp.status} -`, jResp);
				return jResp;
			})
			.retryWhen((errorObs) => this.httpService.retry(errorObs))
			.catch<Response, string>((error) => this.httpService.handleError(error));
	}

	/**
	 * postUser - функция-запрос, выполняет добавление пользователя в систему.
	 *
	 * @kind {function}
	 * @param {ISignup} formValue - значение формы
	 * @return {boolean}
	 */
	postUser (value : ISignup) : Observable<any> {
		let body : string = JSON.stringify(value);

		return this.http.post(Config.serverUrl + Config.usersUrl, body, { headers : this.headers })
			.map<Response, IRAuth>((resp : Response) => {
				let jResp : IRAuth = <IRAuth>resp.json() || {};
				this.logger.info(`${this.constructor.name} - postLogin:`, `status = ${resp.status} -`, jResp);
				return jResp;
			})
			.catch<Response, string>((error : any) => this.httpService.handleError(error));
	}

	/**
	 * postLogin - функция-запрос, выполняет загрузку jwt-токена от сервера.
	 *
	 * @kind {function}
	 * @param {ILogin} formValue - значение формы
	 * @return {boolean}
	 */
	postLogin (formValue : ILogin) : Observable<any> {
		let body : string = JSON.stringify(formValue);

		return this.http.post(Config.serverUrl + Config.authUrl, body, { headers : this.headers })
			.map<Response, IRAuth>((resp : Response) => {
				let jResp : IRAuth = <IRAuth>resp.json() || {};
				this.logger.info(`${this.constructor.name} - postLogin:`, `status = ${resp.status} -`, jResp);
				return jResp;
			})
			.catch<Response, string>((error) => this.httpService.handleError(error));
	}
}
