import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';
import { ModalActions } from '../actions/modal.actions';

import { UserService } from '../core/user.service';
import { LoggerService } from '../core/logger.service';

import { ISignup, IRAuth } from '../shared/interfaces/auth.interface';

@Component({
	moduleId: module.id,
  selector: 'as-signup',
	templateUrl: 'signup.component.html',
  styleUrls: [ 'auth.component.css' ]
})
export class SignupComponent implements OnInit, OnDestroy  {
	form : FormGroup;
	formError = {
		'name' : '',
		'email'	: '',
		'passwords' : '',
		'password' : '',
		'passwordConfirm' : '',
		'serverError' : ''
	};
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

	/* Redux */
	private subscription : Array<Subscription> = [];

	constructor (private fb : FormBuilder,
						 	 private ngRedux : NgRedux<any>,
						 	 private modalActions : ModalActions,
						 	 private logger : LoggerService,
						 	 private userService : UserService) {
	}
	ngOnInit () : void {
		this.buildForm();
	}
	ngOnDestroy () : void {
		this.subscription.map((data) => data.unsubscribe());
	}

	/**
	 * buildForm - функция-метод, выполняет создание формы и возможные регистрации
	 * на события формы.
	 *
	 * @function
	 * @return {void}
	 */
  buildForm () : void {
    this.form = this.fb.group({
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

		this.form.valueChanges
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
    if (!this.form) { return; }
    const form = this.form;

    for (const f1 in form.value) {
			if (form.value.hasOwnProperty(f1)) {
				this.checkFields(form, f1);
				const control = form.get(f1);

				if ('controls' in control) {
					for (const f2 in control.value) {
						if (control.value.hasOwnProperty(f2)) {
							this.checkFields(control, f2);
						}
					}
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
				if (control.errors.hasOwnProperty(key)) {
					this.formError[field] += messages[key] + ' ';
				}
			}
		}
	}

	/**
	 * onSubmit - функция-событие, выполняет регистрацию пользователя в систему и вход
	 * пользователя в систему.
	 *
	 * @kind {event}
	 * @return {void}
	 */
	onSubmit () : void {
		let result : ISignup = <ISignup>Object.assign({}, this.form.value);
		let sub : Subscription = this.userService.postUser(result).subscribe(
			(data : IRAuth) => {
				this.userService.login(data.token);
				this.closeModal();
			},
			(error : string) => {
				this.formError.serverError = error;
			}
		);
		this.subscription.push(sub);
	}


	/**
	 * closeModal - функция-метод, выполняет закрытие модального окна.
	 *
	 * @function
	 * @return {void}
	 */
	closeModal () : void {
		this.ngRedux.dispatch(this.modalActions.closeActiveModal());
	}

	/**
	 * login - функция-метод, выполняет открытие модального окна "Login".
	 *
	 * @function
	 * @return {void}
	 */
	login () : void {
		this.ngRedux.dispatch(this.modalActions.openModal('login'));
	}
}
