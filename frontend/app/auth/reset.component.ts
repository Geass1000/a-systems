import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './auth.service';

import { UserReset } from './user';

import { NgRedux, select } from '@angular-redux/store';
import { ModalActions } from '../actions/modal.actions';

@Component({
	moduleId: module.id,
  selector: 'as-reset',
	templateUrl: 'reset.component.html',
  styleUrls: [ 'auth.component.css' ]
})
export class ResetComponent implements OnInit  {
	@select(['modal', 'reset']) modalOpen : any;

	resetForm : FormGroup;
	formError = {
		'serverError' : ''
	};

	constructor (private fb : FormBuilder,
							 private authService : AuthService,
						 	 private ngRedux : NgRedux<any>,
						 	 private modalActions : ModalActions) { ; }

	ngOnInit () : void {
		this.resetForm = this.fb.group({
      'email' : ['', Validators.required],
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
		const form = this.resetForm.value;
		let user : UserReset = new UserReset(form['email'], form['password']);
		this.authService.reset(user)
				.subscribe(
					(data) => {
						this.resetForm.reset();
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
}
