import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgRedux, select } from '@angular-redux/store';

import { AuthService } from './auth.service';

import { UserLogin } from './user';

import { ModalActions } from '../actions/modal.actions';

@Component({
	moduleId: module.id,
  selector: 'as-login',
	templateUrl: 'login.component.html',
  styleUrls: [ 'auth.component.css' ]
})
export class LoginComponent implements OnInit  {
	@select(['modal', 'login']) modalOpen : any;

	loginForm : FormGroup;

	formError = {
		'serverError' : ''
	};

	constructor (private fb : FormBuilder,
							 private authService : AuthService,
						 	 private ngRedux : NgRedux<any>,
						 	 private modalActions : ModalActions) { ; }

	ngOnInit () : void {
		this.loginForm = this.fb.group({
      'name' : ['', Validators.required],
			'password' : ['', Validators.required]
    });
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
		this.authService.login(user)
				.subscribe(
					(data) => {
						this.loginForm.reset();
						this.resetFormError();
						this.closeModal();
					},
					(error) => {
						this.formError.serverError = error;
					}
				);
	}

	closeModal () {
		this.ngRedux.dispatch(this.modalActions.closeActiveModal());
	}
	signup () {
		this.closeModal();
		this.ngRedux.dispatch(this.modalActions.openModal('signup'));
	}
	resetPassword () {
		this.closeModal();
		this.ngRedux.dispatch(this.modalActions.openModal('reset'));
	}
}
