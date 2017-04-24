import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { ModalActions } from './actions/modal.actions';
import { EditorActions } from './actions/editor.actions';

import { UserService } from './core/user.service';
import { LoggerService } from './core/logger.service';

/* Redux - Reducer */
import { AppReducer, INITIAL_STATE, IAppState } from './reducers/app.store';


@Component({
	moduleId: module.id,
  selector: 'as-app',
	templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ]
})
export class AppComponent implements OnInit, OnDestroy {
	private subscription : any[] = [];
	@select(['modal', 'openPanelOverlay']) openPanelOverlay$ : Observable<boolean>;
	@select(['modal', 'openModalOverlay']) openModalOverlay$ : Observable<boolean>;

	constructor (public userService : UserService,
							 private ngRedux : NgRedux<IAppState>,
						 	 private modalActions : ModalActions,
							 private editorActions : EditorActions,
						 	 private logger : LoggerService) {
		this.ngRedux.configureStore(AppReducer, INITIAL_STATE, null, []);
		this.logger.info(`${this.constructor.name}:`, 'Start app Artificial System!');
	}
	ngOnInit () {
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
