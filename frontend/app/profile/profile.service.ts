import { Injectable, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';
import { UserActions } from '../actions/user.actions';
import 'rxjs/add/operator/mergeMap';

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
	 * @kind {function}
	 * @param {string} userName - имя пользователя (уникальное, регистронезависимое)
	 * @return {void}
	 */
	getProfile (userName : string) : Observable<any> {
		return this.userService.getUser(userName)
      .mergeMap((user) => {
        return this.projectService.getProjects(user._id);
      });
	}
}
