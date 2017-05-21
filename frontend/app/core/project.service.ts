import { Injectable, OnDestroy } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';
import { EditorActions } from '../actions/editor.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Config } from '../config';

import { LoggerService } from './logger.service';
import { HttpService } from './http.service';

import { IProject, IRProject, IRProjects } from '../shared/interfaces/project.interface';

@Injectable()
export class ProjectService implements OnDestroy {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	/* Redux */
	private subscription : Array<Subscription> = [];

	constructor (private http : Http,
							 private authHttp : AuthHttp,
							 private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
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
	 * setProject - выполняет подготовку и установку проекта в хранилище.
	 *
	 * @kind {function}
	 * @method
	 *
	 * @param {string} project - объект проекта
	 * @return {void}
	 */
	setProject (project : IProject) : void {
		if (!project) {
			this.logger.error(`${this.constructor.name} - setProject:`, 'Project isn\'t exist!');
			return;
		}
		this.logger.info(`${this.constructor.name} - setProject:`, 'project -', project);
		this.ngRedux.dispatch(this.editorActions.setProject(project));
	}


	/**
	 * getUser - функция-запрос, выполняет получение данных о проекте с идентификатором id.
	 *
	 * @kind {function}
	 * @method
	 *
	 * @param {string} userName - имя пользователя (уникальное, регистронезависимое)
	 * @return {void}
	 */
	getProject (projectId : string) : Observable<IRProject | string> {
		return this.authHttp.get(Config.serverUrl + Config.projectUrl + projectId, { headers : this.headers })
			.map<Response, IRProject>((resp : Response) => {
				let jResp : IRProject = <IRProject>resp.json() || null;
				this.logger.info(`${this.constructor.name} - getProject:`, `status = ${resp.status} -`, jResp);
				return jResp;
			})
			.catch<any, string>((error) => this.httpService.handleError(error));
	}

  /**
	 * getUser - функция-запрос, выполняет получение спсика всех проектов пользователя или всех созданных
	 * проектов.
	 *
	 * @kind {function}
	 * @method
	 *
	 * @param {string} userId - id пользователя (уникальный)
	 * @return {void}
	 */
	getProjects (userId ?: string) : Observable<IRProjects | string> {
    let query : string = userId ? `?uid=${userId}` : '';
		return this.authHttp.get(Config.serverUrl + Config.projectUrl + query, { headers : this.headers })
			.map<Response, IRProjects>((resp : Response) => {
				let jResp : IRProjects = <IRProjects>resp.json() || null;
				this.logger.info(`${this.constructor.name} - getProject:`, `status = ${resp.status} -`, jResp);
				return jResp;
			})
			.catch<any, string>((error) => this.httpService.handleError(error));
	}
}
