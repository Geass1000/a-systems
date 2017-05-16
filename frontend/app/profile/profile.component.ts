import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { UserActions } from '../actions/user.actions';

import { LoggerService } from '../core/logger.service';
import { UserService } from '../core/user.service';

@Component({
	moduleId: module.id,
	selector: 'as-profile',
	templateUrl: 'profile.component.html',
  styleUrls: [ 'profile.component.css' ]
})
export class ProfileComponent implements OnInit, OnDestroy {
	private activeName : string;

	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['user', 'id']) userId$ : Observable<string>;
	private userId : string;
	@select(['user', 'name']) userName$ : Observable<string>;
	private userName : string;

	private mapSubscription : Map<string, boolean> = new Map([
		[ 'userId', false ],
		[ 'userName', false ],
		[ 'activeName', false ]
	]);

	constructor (private router : Router,
							 private activateRoute: ActivatedRoute,
							 private ngRedux : NgRedux<any>,
						 	 private userActions : UserActions,
						 	 private logger : LoggerService,
						 	 private userService : UserService) {
	}
	ngOnInit () {
		this.subscription.push(this.userId$.subscribe((data) => {
			this.userId = data;
			this.mapSubscription.set('userId', true);
			this.logger.info(`${this.constructor.name} - ngOnInit:`, 'Redux -', 'userId -', this.userId);
			this.prepareUserData();
		}));
		this.subscription.push(this.userName$.subscribe((data) => {
			this.userName = data;
			this.mapSubscription.set('userName', true);
			this.logger.info(`${this.constructor.name} - ngOnInit:`, 'Redux -', 'userName -', this.userName);
			this.prepareUserData();
		}));
		this.subscription.push(this.activateRoute.params.subscribe((params) => {
			this.activeName = params['name'];
			this.mapSubscription.set('activeName', true);
			this.logger.info(`${this.constructor.name} - ngOnInit:`, 'activeName -', this.activeName);
			this.prepareUserData();
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	prepareUserData () : void {
		let arrSubscription : Array<boolean> = Array.from(this.mapSubscription.values());
		let confirmSubscription : boolean = arrSubscription.every((data : boolean) => {
			return data;
		});
		if (!confirmSubscription) {
			return ;
		}
		if (!this.activeName) {
			if (this.userService.loggedIn()) {
				this.router.navigate(['profile', this.userName.toLowerCase()]);
				this.logger.info(`${this.constructor.name} - prepareUserData:`, 'Access is granted! Renavigate...');
			} else {
				this.router.navigateByUrl('/');
				this.logger.warn(`${this.constructor.name} - prepareUserData:`, 'Access is denide! Renavigate...');
			}
			return ;
		}
		this.userService.getUserId(this.activeName).subscribe((data : any) => {
			this.logger.info(`${this.constructor.name} - prepareUserData:`, 'data -', data);
		});
	}

	/**
	 * getUserId - функция, возвращающая id текущего пользователя.
	 *
	 * @kind {function}
	 * @return {string}
	 */
	getUserId () : string {
		return this.userId;
	}

	/**
	 * getUserName - функция, возвращающая имя текущего пользователя.
	 *
	 * @kind {function}
	 * @return {string}
	 */
	getUserName () : string {
		return this.userName;
	}
}
