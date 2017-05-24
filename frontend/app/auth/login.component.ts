import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/* App Redux and Request */
import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';
import { ModalActions } from '../actions/modal.actions';

/* App Services */
import { LoggerService } from '../core/logger.service';
import { UserService } from '../core/user.service';

/* App Interfaces and Classes */
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
      'nickname' : [ '', [ Validators.required ] ],
			'password' : [ '', [ Validators.required ] ]
    });
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
	 * signup - функция-метод, выполняет открытие модального окна "Signup".
	 *
	 * @function
	 * @return {void}
	 */
	signup () : void {
		this.ngRedux.dispatch(this.modalActions.openModal('signup'));
	}

	/**
	 * resetPassword - функция-метод, выполняет открытие модального окна "ResetPassword".
	 *
	 * @function
	 * @return {void}
	 */
	resetPassword () : void {
		this.ngRedux.dispatch(this.modalActions.openModal('reset'));
	}

	/**
	 * onSubmit - функция-событие, выполняет вход пользователя в систему.
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
