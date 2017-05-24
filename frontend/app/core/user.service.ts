import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { AuthHttp, tokenNotExpired, JwtHelper } from 'angular2-jwt';

import { Config } from '../config';

/* App Redux and Request */
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';
import { UserActions } from '../actions/user.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

/* App Services */
import { LoggerService } from './logger.service';
import { HttpService } from './http.service';

/* App Interfaces and Classes */
import { ILogin, ISignup, IRAuth, IRUser } from '../shared/interfaces/auth.interface';

@Injectable()
export class UserService implements OnDestroy {
	private jwtHelper: JwtHelper;
	private headers = new Headers({ 'Content-Type': 'application/json' });

	/* Redux */
	private subscription : Array<Subscription> = [];

	constructor (private router: Router,
							 private http : Http,
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
	 * @method
	 *
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
	 * @method
	 *
	 * @return {void}
	 */
	logout () : void {
		localStorage.removeItem('token');
		this.ngRedux.dispatch(this.userActions.resetStoreUser());
		this.router.navigate(['/']);
	}

	/**
	 * loggedIn - функция-метод, выполняет проверку: "Находится ли пользователь в системе?".
	 *
	 * @method
	 *
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
	 * @method
	 *
	 * @param {string} userName - имя пользователя (уникальное, регистронезависимое)
	 * @return {void}
	 */
	getUser (userName : string) : Observable<IRUser | string> {
		return this.authHttp.get(Config.serverUrl + Config.usersUrl + userName, { headers : this.headers })
			.map<Response, IRUser>((resp : Response) => {
				let jResp : IRUser = <IRUser>resp.json() || null;
				this.logger.info(`${this.constructor.name} - getUserId:`, `status = ${resp.status} -`, jResp);
				return jResp;
			})
			.catch<any, string>((error : any) => this.httpService.handleError(error));
	}

	/**
	 * postUser - функция-запрос, выполняет добавление пользователя в систему.
	 *
	 * @method
	 *
	 * @param {ISignup} formValue - значение формы
	 * @return {boolean}
	 */
	postUser (value : ISignup) : Observable<any> {
		let body : string = JSON.stringify(value);

		return this.http.post(Config.serverUrl + Config.usersUrl, body, { headers : this.headers })
			.map<Response, IRAuth>((resp : Response) => {
				let jResp : IRAuth = <IRAuth>resp.json() || null;
				this.logger.info(`${this.constructor.name} - postLogin:`, `status = ${resp.status} -`, jResp);
				return jResp;
			})
			.catch<any, string>((error : any) => this.httpService.handleError(error));
	}

	/**
	 * postLogin - функция-запрос, выполняет загрузку jwt-токена от сервера.
	 *
	 * @method
	 * 
	 * @param {ILogin} formValue - значение формы
	 * @return {boolean}
	 */
	postLogin (formValue : ILogin) : Observable<any> {
		let body : string = JSON.stringify(formValue);

		return this.http.post(Config.serverUrl + Config.authUrl, body, { headers : this.headers })
			.map<Response, IRAuth>((resp : Response) => {
				let jResp : IRAuth = <IRAuth>resp.json() || null;
				this.logger.info(`${this.constructor.name} - postLogin:`, `status = ${resp.status} -`, jResp);
				return jResp;
			})
			.catch<any, string>((error) => this.httpService.handleError(error));
	}
}
