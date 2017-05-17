import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';
import { ModalActions } from '../actions/modal.actions';

import { UserService } from '../core/user.service';
import { LoggerService } from '../core/logger.service';

import { ILogin, IRAuth } from '../shared/interfaces/auth.interface';

@Component({
	moduleId: module.id,
  selector: 'as-login',
	templateUrl: 'login.component.html',
  styleUrls: [ 'auth.component.css' ]
})
export class LoginComponent implements OnInit, OnDestroy {
	form : FormGroup;

	formError = {
		'serverError' : ''
	};

	/* Redux */
	private subscription : Array<Subscription> = [];

	constructor (private fb : FormBuilder,
						 	 private ngRedux : NgRedux<any>,
						 	 private modalActions : ModalActions,
						 	 private logger : LoggerService,
						 	 private userService : UserService) { ; }

	ngOnInit () : void {
		this.form = this.fb.group({
      'login' : ['', Validators.required],
			'password' : ['', Validators.required]
    });
  }
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	/**
	 * buildForm - функция, выполняющая создание формы и/или регистрацию на событие
	 * изменения данных.
	 *
	 * @kind {function}
	 * @return {void}
	 */
	buildForm () : void {
		this.form = this.fb.group({
      'login' : [ '', [ Validators.required ] ],
			'password' : [ '', [ Validators.required ] ]
    });
	}

	/**
	 * closeModal - функция, выполняющеая закрытие модального окна.
	 *
	 * @kind {function}
	 * @return {void}
	 */
	closeModal () : void {
		this.ngRedux.dispatch(this.modalActions.closeActiveModal());
	}

	/**
	 * signup - функция, выполняющеая открытие модального окна "Signup".
	 *
	 * @kind {function}
	 * @return {void}
	 */
	signup () : void {
		this.ngRedux.dispatch(this.modalActions.openModal('signup'));
	}

	/**
	 * resetPassword - функция, выполняющеая открытие модального окна "ResetPassword".
	 *
	 * @kind {function}
	 * @return {void}
	 */
	resetPassword () : void {
		this.ngRedux.dispatch(this.modalActions.openModal('reset'));
	}

	/**
	 * onSubmit - событие, выполняющее вход пользователя в систему.
	 *
	 * @kind {event}
	 * @return {void}
	 */
	onSubmit () : void {
		let result : ILogin = <ILogin>Object.assign({}, this.form.value);
		let sub : Subscription = this.userService.postLogin(result).subscribe(
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
}
