import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgRedux, select } from '@angular-redux/store';

import { AuthService } from './auth.service';

import { UserLogin } from './user';

import { AppActions } from '../app.actions';

@Component({
	moduleId: module.id,
  selector: 'as-login',
	templateUrl: 'login.component.html',
  styleUrls: [ 'auth.component.css' ]
})
export class LoginComponent implements OnInit  {
	state : boolean  = false;
	@select(['modal', 'login']) modalOpen : any;

	serverError : string = '';

	loginForm : FormGroup;

	constructor (private fb : FormBuilder,
							 private authService : AuthService,
						 	 private ngRedux : NgRedux<any>,
						 	 private appActions : AppActions) { ; }

	ngOnInit (): void {
		this.loginForm = this.fb.group({
      'name' : ['', Validators.required],
			'password' : ['', Validators.required]
    });
  }

	/* CSS effect - focus/blur */
	focusInput = {
		name : false,
		password : false
	};
	onInputFocus (event : any) {
		let target = event.target;
		if (target.localName === "input") {
			for (let i in this.focusInput) {
				this.focusInput[i] = false;
			}
			this.focusInput[target.name] = true;
		}
	}
	onInputBlur () {
		for (let i in this.focusInput) {
			this.focusInput[i] = false;
		}
	}

	onSubmit () {
		const form = this.loginForm.value;
		let user : UserLogin = new UserLogin(form['name'], form['password']);
		this.serverError = '';
		this.authService.login(user)
				.subscribe(
					(data) => {
						this.loginForm.reset();
						this.ngRedux.dispatch(this.appActions.closeAllModal());
					},
					(error) => {
						this.serverError = error;
					}
				);
	}

	signup () {
		this.ngRedux.dispatch(this.appActions.closeAllModal());
		this.ngRedux.dispatch(this.appActions.openModal('signup'));
	}
}
