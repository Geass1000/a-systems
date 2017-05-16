import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';

import { AuthService } from './auth.service';
import { UserService } from '../core/user.service';
import { LoggerService } from '../core/logger.service';

import { UserLogin } from './user';

import { ModalActions } from '../actions/modal.actions';

@Component({
	moduleId: module.id,
  selector: 'as-login',
	templateUrl: 'login.component.html',
  styleUrls: [ 'auth.component.css' ]
})
export class LoginComponent implements OnInit, OnDestroy {
	@select(['modal', 'login']) modalOpen : any;

	loginForm : FormGroup;

	formError = {
		'serverError' : ''
	};

	/* Redux */
	private subscription : Array<Subscription> = [];

	constructor (private fb : FormBuilder,
							 private authService : AuthService,
						 	 private ngRedux : NgRedux<any>,
						 	 private modalActions : ModalActions,
						 	 private userService : UserService,
						 	 private logger : LoggerService) { ; }

	ngOnInit () : void {
		this.loginForm = this.fb.group({
      'name' : ['', Validators.required],
			'password' : ['', Validators.required]
    });
  }
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	resetFormError () {
		for (const key in this.formError) {
			if (this.formError.hasOwnProperty(key)) {
				this.formError[key] = ' ';
			}
		}
	}

	onSubmit () {
		const form = this.loginForm.value;
		let user : UserLogin = new UserLogin(form['name'], form['password']);
		this.subscription.push(
			this.authService.login(user).subscribe(
				(data) => {
					this.userService.login(data.token);
					this.closeModal();
				},
				(error) => {
					this.formError.serverError = error;
				}
			)
		);
	}

	closeModal () {
		this.ngRedux.dispatch(this.modalActions.closeActiveModal());
	}
	signup () {
		this.ngRedux.dispatch(this.modalActions.openModal('signup'));
	}
	resetPassword () {
		this.ngRedux.dispatch(this.modalActions.openModal('reset'));
	}
}
