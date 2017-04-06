import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { UserService } from './core/user.service';

/* Redux - Reducer */
import { AppReducer, INITIAL_STATE, IAppState } from './reducers/app.store';

/* Redux - Actions */
import { ModalActions } from './actions/modal.actions';

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
							 private ngRedux : NgRedux<IAppState>,
						 	 private modalActions : ModalActions) {
		this.ngRedux.configureStore(AppReducer, INITIAL_STATE, null, []);
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
