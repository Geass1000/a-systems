import { Injectable, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';
import { UserActions } from '../actions/user.actions';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

import { IRProfile } from '../shared/interfaces/app.interface';
import { IRUser } from '../shared/interfaces/auth.interface';
import { IRProject, IRProjects } from '../shared/interfaces/project.interface';

import { LoggerService } from '../core/logger.service';
import { UserService } from '../core/user.service';
import { ProjectService } from '../core/project.service';

@Injectable()
export class ProfileService implements OnDestroy {
	/* Redux */
	private subscription : Array<Subscription> = [];

	constructor (private ngRedux : NgRedux<any>,
							 private userActions : UserActions,
							 private logger : LoggerService,
						 	 private userService : UserService,
               private projectService : ProjectService) {
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
	 * @function
	 * @method
	 *
	 * @param {string} userName - имя пользователя (уникальное, регистронезависимое)
	 * @return {Observable<IRProfile>}
	 */
	getProfile (userName : string) : Observable<IRProfile | string> {
		let profile : IRProfile = {
			user : null,
			projects : null
		};
		return this.userService.getUser(userName)
      .mergeMap<IRUser, IRProjects>((data : IRUser) => {
				profile.user = data.user;
        return this.projectService.getProjects(data.user._id);
      })
			.mergeMap<IRProjects, IRProfile>((data : IRProjects) => {
				profile.projects = data.projects;
				return Observable.of(profile);
			});
	}

	/**
	 * setProject - выполняет получение данных пользователя от сервера.
	 *
	 * @function
	 * @method
	 *
	 * @param {string} userName - имя пользователя (уникальное, регистронезависимое)
	 * @return {void}
	 */
	setProject (projectId : string) : any {
		this.logger.info(`${this.constructor.name} - setProject:`, 'projectId -', projectId);
		this.projectService.getProject(projectId).subscribe((data : IRProject) => {
			this.projectService.setProject(data.project);
		});
		return;
	}
}
