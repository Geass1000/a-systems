import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';

/* App Redux and Request */
import { AppReducer, INITIAL_STATE, IApp } from './reducers/app.store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { ModalActions } from './actions/modal.actions';
import { EditorActions } from './actions/editor.actions';
import { AppActions } from './actions/app.actions';

/* App Services */
import { LoggerService } from './core/logger.service';
import { UserService } from './core/user.service';

/* App Animations */
import { animation } from './shared/animations/modal.animation';

@Component({
	moduleId: module.id,
  selector: 'as-app',
	templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.scss' ],
	animations: [ animation ]
})
export class AppComponent implements OnInit, OnDestroy {
	private animationState : string = 'open';

	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['modal', 'openPanelOverlay']) openPanelOverlay$ : Observable<boolean>;
	@select(['modal', 'openModalOverlay']) openModalOverlay$ : Observable<boolean>;
	private openModalOverlay : boolean;
	@select(['modal', 'login']) modalLogin$ : Observable<boolean>;
	@select(['modal', 'signup']) modalSignup$ : Observable<boolean>;
	@select(['modal', 'reset']) modalReset$ : Observable<boolean>;
	@select(['state', 'fullwidthMode']) fullwidthMode$ : Observable<boolean>;

	constructor (private router : Router,
							 private ngRedux : NgRedux<IApp>,
						 	 private modalActions : ModalActions,
							 private editorActions : EditorActions,
							 private appActions : AppActions,
						 	 private logger : LoggerService,
						 	 private userService : UserService) {
		this.ngRedux.configureStore(AppReducer, INITIAL_STATE, null, []);
		this.logger.info(`${this.constructor.name}:`, 'Start app Artificial System!');
	}
	ngOnInit () {
		this.router.events.subscribe((event : RouterEvent) => {
			if (event instanceof NavigationStart || event instanceof NavigationEnd) {
				if (event.url === '/editor') {
					this.ngRedux.dispatch(this.appActions.toggleFullwidthMode(true));
				} else {
					this.ngRedux.dispatch(this.appActions.toggleFullwidthMode(false));
				}
			}
		});
		this.subscription.push(this.openModalOverlay$.subscribe((data) => {
			this.openModalOverlay = data;
			this.animationState = data ? 'open' : '';
		}));
		this.userService.login();
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	loggedIn () {
		return this.userService.loggedIn();
	}

	login () {
		this.ngRedux.dispatch(this.modalActions.openModal('login'));
	}
	signup () {
		this.ngRedux.dispatch(this.modalActions.openModal('signup'));
	}
	logout () {
		this.userService.logout();
	}

	closeAllModal () {
		this.ngRedux.dispatch(this.modalActions.closeActiveModal());
	}
}
