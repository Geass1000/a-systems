import { Injectable, OnDestroy } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Config } from '../config';

/* App Redux and Request */
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';
import { EditorActions } from '../actions/editor.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

/* App Services */
import { LoggerService } from './logger.service';
import { HttpService } from './http.service';

/* App Interfaces and Classes */
import { IProject, IRProject, IRProjects, IRProjectsSave, IRProjectsDelete } from '../shared/interfaces/project.interface';

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
	 * getProject - функция-запрос, выполняет получение данных о проекте с идентификатором projectId.
	 *
	 * @method
	 *
	 * @param {string} projectId - id проекта
	 * @return {Observable<IRProject>}
	 */
	getProject (projectId : string) : Observable<IRProject | string> {
		const methodName : string = 'getProject';

		this.ngRedux.dispatch(this.editorActions.resetProject());
		return this.authHttp.get(Config.projectUrl + projectId, { headers : this.headers })
			.map<Response, IRProject>((resp : Response) => {
				return this.httpService.mapData<IRProject>(resp, this.constructor.name, methodName);
			})
			.catch<any, string>((error) => this.httpService.handleError(error));
	}

  /**
	 * getProjects - функция-запрос, выполняет получение спсика всех проектов пользователя
	 * или всех созданных проектов.
	 *
	 * @method
	 *
	 * @param {string} userId - id пользователя (уникальный)
	 * @return {Observable<IRProjects>}
	 */
	getProjects (userId ?: string) : Observable<IRProjects | string> {
		const methodName : string = 'getProjects';

    const query : string = userId ? `?uid=${userId}` : '';

		return this.authHttp.get(Config.projectUrl + query, { headers : this.headers })
			.map<Response, IRProjects>((resp : Response) => {
				return this.httpService.mapData<IRProjects>(resp, this.constructor.name, methodName);
			})
			.catch<any, string>((error) => this.httpService.handleError(error));
	}

	/**
	 * postProject - функция-запрос, выполняет добавление проекта в БД.
	 *
	 * @method
	 *
	 * @param {IProject} value - даннные проекта
	 * @return {Observable<IRProjectsSave>}
	 */
	postProject (value : IProject) : Observable<IRProjectsSave | string> {
		const methodName : string = 'postProject';

		const body : string = JSON.stringify(value);

		return this.authHttp.post(Config.projectUrl, body, { headers : this.headers })
			.map<Response, IRProjectsSave>((resp : Response) => {
				return this.httpService.mapData<IRProjectsSave>(resp, this.constructor.name, methodName);
			})
			.catch<any, string>((error : any) => this.httpService.handleError(error));
	}

	/**
	 * postProject - функция-запрос, выполняет добавление проекта в БД.
	 *
	 * @method
	 *
	 * @param {string} projectId - id проекта
	 * @param {IProject} value - даннные проекта
	 * @return {Observable<IRProjectsSave>}
	 */
	putProject (projectId : string, value : IProject) : Observable<IRProjectsSave | string> {
		const methodName : string = 'putProject';

		const body : string = JSON.stringify(value);

		return this.authHttp.put(Config.projectUrl + projectId, body, { headers : this.headers })
			.map<Response, IRProjectsSave>((resp : Response) => {
				return this.httpService.mapData<IRProjectsSave>(resp, this.constructor.name, methodName);
			})
			.catch<any, string>((error : any) => this.httpService.handleError(error));
	}

	/**
	 * deleteProject - функция-запрос, выполняет удаление проекта из БД.
	 *
	 * @method
	 *
	 * @param {string} projectId - id проекта
	 * @return {Observable<IRProjectsDelete>}
	 */
	deleteProject (projectId : string) : Observable<IRProjectsDelete | string> {
		const methodName : string = 'deleteProject';

		return this.authHttp.delete(Config.projectUrl + projectId, { headers : this.headers })
			.map<Response, IRProjectsDelete>((resp : Response) => {
				return this.httpService.mapData<IRProjectsDelete>(resp, this.constructor.name, methodName);
			})
			.catch<any, string>((error : any) => this.httpService.handleError(error));
	}
}
