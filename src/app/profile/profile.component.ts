import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/* App Redux and Request */
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';

/* App Services */
import { LoggerService } from '../core/logger.service';
import { ProfileService } from './profile.service';
import { UserService } from '../core/user.service';
import { ProjectService } from '../core/project.service';

/* App Interfaces and Classes */
import { IRProfile } from '../shared/interfaces/app.interface';
import { IProjects, IRProject } from '../shared/interfaces/project.interface';

@Component({
	moduleId: module.id,
	selector: 'as-profile',
	templateUrl: 'profile.component.html',
  styleUrls: [ 'profile.component.scss' ]
})
export class ProfileComponent implements OnInit, OnDestroy {
	private activeName : string;
  public profile : IRProfile;

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
						 	 private logger : LoggerService,
							 private profileService : ProfileService,
						 	 private userService : UserService,
               private projectService : ProjectService) {
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
		const arrSubscription : Array<boolean> = Array.from(this.mapSubscription.values());
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
    this.profileService.getProfile(this.activeName).subscribe(
			(data : IRProfile) => {
				if (data) {
					this.profile = data;
				}
				this.logger.info(`${this.constructor.name} - prepareUserData:`, 'profile -', this.profile);
				this.logger.info(`${this.constructor.name} - prepareUserData:`, 'data -', data);
			},
			(error : string) => {
				this.logger.warn(`${this.constructor.name} - prepareUserData:`, error, 'Renavigate...');
				this.router.navigateByUrl('/');
			}
		);
	}

	/**
	 * getDate - выполняет создание пользовательского представления даты регистрации
	 * пользователя.
	 *
	 * @function
	 * @method
	 *
	 * @param {string} date - дата регистрации
	 * @return {string}
	 */
	getDate (date : string) : string {
		return new Date(date).toDateString();
	}


	/**
	 * createHrefUserEmail - выполняет создание ссылки для отправки сообщения
	 * пользователю на почтовый ящек.
	 *
	 * @function
	 * @method
	 *
	 * @param {string} email - email адрес
	 * @return {string}
	 */
	createHrefUserEmail (email : string) : string {
		return `mailto:${email}`;
	}

	/**
	 * onClickOpenProject - выполняет обработкку нажатия на элемент из списка "Проекты".
	 *
	 * @kind {event}
	 * @method
	 *
	 * @param {MouseEvent} event - объект события
	 * @return {void}
	 */
	onClickProject (event : MouseEvent) : void {
		const elButton : Element = (<HTMLElement>event.target).closest('.project-control-button');
		const elProject : Element = (<HTMLElement>event.target).closest('.project-item');
		if (!elButton || !elProject) {
			this.logger.info(`${this.constructor.name} - onClickOpenProject:`, 'Not project');
			return;
		}
		const eventType : string = elButton.getAttribute('data-event-type');
		const projectId : string = elProject.getAttribute('data-item-id').toString();

		this.logger.info(`${this.constructor.name} - onClickOpenProject:`, 'eventType', eventType);
		this.logger.info(`${this.constructor.name} - onClickOpenProject:`, 'projectId', projectId);

		switch (eventType) {
			case 'edit' : {
				this.projectService.getProject(projectId).subscribe((data : IRProject) => {
					this.projectService.setProject(data.project);
					this.router.navigateByUrl('/editor');
				});
				break;
			}
			case 'delete' : {
				this.projectService.deleteProject(projectId).subscribe((data : IRProject) => {
					this.profile.projects = this.profile.projects.filter((project : IProjects) => {
						return project._id !== projectId;
					});
				});
				break;
			}
		}

	}
}
