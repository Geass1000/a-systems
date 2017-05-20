import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { UserActions } from '../actions/user.actions';

import { LoggerService } from '../core/logger.service';
import { UserService } from '../core/user.service';
import { ProjectService } from '../core/project.service';
import { ProfileService } from './profile.service';

interface IProfileUser {
  _id : string;
  nickname : string;
  email : string;
  created_at : string;
}

interface IProfileProject {
  _id : string;
  name : string;
}

@Component({
	moduleId: module.id,
	selector: 'as-profile',
	templateUrl: 'profile.component.html',
  styleUrls: [ 'profile.component.css' ]
})
export class ProfileComponent implements OnInit, OnDestroy {
	private activeName : string;
  private profileUser : IProfileUser;
  private profileProject : Array<IProfileProject>;

	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['user', 'name']) userName$ : Observable<string>;
	private userName : string;

	private mapSubscription : Map<string, boolean> = new Map([
		[ 'userName', false ],
		[ 'activeName', false ]
	]);

	constructor (private router : Router,
							 private activateRoute: ActivatedRoute,
							 private ngRedux : NgRedux<any>,
						 	 private userActions : UserActions,
						 	 private logger : LoggerService,
						 	 private userService : UserService,
               private projectService : ProjectService,
               private profileService : ProfileService) {
	}
	ngOnInit () {
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
		if (!arrSubscription.every( (data : boolean) => data )) {
			return ;
		}
		if (!this.userService.loggedIn()) {
			this.logger.warn(`${this.constructor.name} - prepareUserData:`, 'Access is denide! Renavigate...');
			this.router.navigateByUrl('/');
			return ;
		}
		if (!this.activeName) {
			this.logger.info(`${this.constructor.name} - prepareUserData:`, 'Access is granted! Renavigate...');
			this.router.navigate(['profile', this.userName.toLowerCase()]);
			return ;
		}
    /*
		this.userService.getUser(this.activeName).subscribe((data : any) => {
      this.profileUser = <IProfileUser>data;
      if (data) {
        this.projectService.getProjects(this.profileUser._id).subscribe((d2 : any) => {
          this.profileProject = <Array<IProfileProject>>d2;
    			this.logger.info(`${this.constructor.name} - prepareUserData:`, 'd2 -', d2);
    		});
      }
			this.logger.info(`${this.constructor.name} - prepareUserData:`, 'data -', data);
		});*/
    this.profileService.getProfile(this.activeName).subscribe((data : any) => {
			this.logger.info(`${this.constructor.name} - prepareUserData:`, 'data -', data);
		});
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
