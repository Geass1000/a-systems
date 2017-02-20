import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgRedux, select } from '@angular-redux/store';

import { AuthService } from './auth.service';

import { UserSignup } from './user';

import { ModalActions } from '../actions/modal.actions';

@Component({
	moduleId: module.id,
  selector: 'as-signup',
	templateUrl: 'signup.component.html',
  styleUrls: [ 'auth.component.css' ]
})
export class SignupComponent implements OnInit  {
	@select(['modal', 'signup']) modalOpen : any;

	signupForm : FormGroup;

	constructor (private fb : FormBuilder,
							 private authService : AuthService,
						 	 private ngRedux : NgRedux<any>,
						 	 private modalActions : ModalActions) { }

	ngOnInit () : void {
    this.buildForm();
  }

  buildForm () : void {
    this.signupForm = this.fb.group({
      'name' : ['', [
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(30)
				]
			],
			'email' : ['', Validators.required],
			'passwords' : this.fb.group({
				'password' : ['', [
						Validators.required,
						Validators.minLength(8),
						Validators.maxLength(50)
					]
				],
				'passwordConfirm' : ['', Validators.required]
			}, { validator: this.passwordMatchValidator })
    });

		this.signupForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

	passwordMatchValidator (g: FormGroup) {
		let password = g.get('password');
		let passwordConfirm = g.get('passwordConfirm');
	  return password.value === passwordConfirm.value ||
			!password.dirty || !passwordConfirm.dirty
			? null : {'mismatch': true};
	}

	onValueChanged (data?: any) {
    if (!this.signupForm) { return; }
    const form = this.signupForm;

    for (const f1 in form.value) {
			this.checkFields(form, f1);
			const control = form.get(f1);

			if ("controls" in control) {
				for (const f2 in control.value) {
					this.checkFields(control, f2);
				}
			}
    }
  }

	checkFields (form : any, field : any) {
		this.formError[field] = '';
		const control = form.get(field);

		if (control && control.dirty && !control.valid) {
			const messages = this.validationMessages[field];
			for (const key in control.errors) {
				this.formError[field] += messages[key] + ' ';
			}
		}
	}

	formError = {
		'name' : '',
		'email'	: '',
		'passwords' : '',
		'password' : '',
		'passwordConfirm' : '',
		'serverError' : ''
	};
	resetFormError () {
		for (const key in this.formError) {
			this.formError[key] = ' ';
		}
	}

	validationMessages = {
    'name' : {
      'required' : 'Name is required.',
      'minlength' : 'Name must be at least 3 characters long.',
      'maxlength' : 'Name cannot be more than 30 characters long.'
    },
    'email' : {
      'required' : 'E-mail is required.'
    },
		'passwords' : {
      'mismatch' : 'Passwords must be equal.'
    },
    'password' : {
      'required' : 'Password is required.',
			'minlength' : 'Password must be at least 8 characters long.',
      'maxlength' : 'Password cannot be more than 50 characters long.'
    },
		'passwordConfirm' : {
      'required' : 'Confirm password is required.'
    }
  };

	/* CSS effect - focus/blur */
	focusInput = {
		name : false,
		email : false,
		password : false,
		passwordConfirm : false
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
		const form = this.signupForm.value;
		let user : UserSignup = new UserSignup(form['name'], form['email'],
																					 form['passwords']['password']);
		this.authService.addUser(user)
				.subscribe(
					(data) => {
						this.signupForm.reset();
						this.resetFormError();
						this.closeModal();
					},
					(error) => {
						this.formError.serverError = error;
				});
	}

	closeModal () {
		this.ngRedux.dispatch(this.modalActions.closeAllModal());
	}
	login () {
		this.closeModal();
		this.ngRedux.dispatch(this.modalActions.openModal('login'));
	}
}
