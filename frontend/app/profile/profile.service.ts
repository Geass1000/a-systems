import { Injectable, OnDestroy } from '@angular/core';

/* App Redux and Request */
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';
import { UserActions } from '../actions/user.actions';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

/* App Services */
import { LoggerService } from '../core/logger.service';
import { UserService } from '../core/user.service';
import { ProjectService } from '../core/project.service';

/* App Interfaces and Classes */
import { IRProfile } from '../shared/interfaces/app.interface';
import { IRUser } from '../shared/interfaces/auth.interface';
import { IRProjects } from '../shared/interfaces/project.interface';

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
}
