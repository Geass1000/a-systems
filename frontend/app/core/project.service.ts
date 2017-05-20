import { Injectable, OnDestroy } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';

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

@Injectable()
export class ProjectService implements OnDestroy {
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
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}


	/**
	 * getUser - функция-запрос, выполняет получение данных пользователя от сервера.
	 *
	 * @kind {function}
	 * @param {string} userName - имя пользователя (уникальное, регистронезависимое)
	 * @return {void}
	 */
	getProject (projectId : string) : Observable<any> {
		return this.authHttp.get(Config.serverUrl + Config.projectUrl + projectId, { headers : this.headers })
			.map<Response, any>((resp : Response) => {
				let jResp = resp.json() || {};
				this.logger.info(`${this.constructor.name} - getProject:`, `status = ${resp.status} -`, jResp);
				return jResp;
			})
			.catch<Response, string>((error) => this.httpService.handleError(error));
	}

  /**
	 * getUser - функция-запрос, выполняет получение данных пользователя от сервера.
	 *
	 * @kind {function}
	 * @param {string} userName - имя пользователя (уникальное, регистронезависимое)
	 * @return {void}
	 */
	getProjects (userId : string) : Observable<any> {
    let query : string = userId ? `?uid=${userId}` : '';
		return this.authHttp.get(Config.serverUrl + Config.projectUrl + query, { headers : this.headers })
			.map<Response, any>((resp : Response) => {
				let jResp = resp.json() || {};
				this.logger.info(`${this.constructor.name} - getProject:`, `status = ${resp.status} -`, jResp);
				return jResp;
			})
			.catch<Response, string>((error) => this.httpService.handleError(error));
	}
}
