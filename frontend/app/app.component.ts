import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { UserService } from './core/user.service';

/* Redux - Reducers */
import { AppReducer, INITIAL_STATE } from './app.reducer';

/* Redux - Actions */
import { AppActions } from './app.actions';

@Component({
	moduleId: module.id,
  selector: 'as-app',
	templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ]
})
export class AppComponent  {
	title = 'Main';
	@select(['modal', 'open']) modalOpen : any;

	constructor (public userService : UserService,
							 private ngRedux : NgRedux<any>,
						 	 private appActions : AppActions) {
		this.ngRedux.configureStore(AppReducer, INITIAL_STATE, null, []);
	}

	loggedIn () {
		return this.userService.loggedIn();
	}

	login () {
		this.ngRedux.dispatch(this.appActions.openModal('login'));
	}
	signup () {
		this.ngRedux.dispatch(this.appActions.openModal('signup'));
	}

	logout () {
		this.userService.logout();
	}

	closeAllModal () {
		this.ngRedux.dispatch(this.appActions.closeAllModal());
	}
}
