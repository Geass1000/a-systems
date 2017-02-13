import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './auth.service';

import { UserLogin } from './user-login';

@Component({
	moduleId: module.id,
  selector: 'as-login',
	templateUrl: 'login.component.html',
  styleUrls: [ 'login.component.css' ]
})
export class LoginComponent implements OnInit  {
	title = 'Login';

	serverError : string = '';

	loginForm : FormGroup;

	constructor (private fb : FormBuilder,
							 private authService : AuthService,
							 private router: Router) { ; }

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
	onInputFocus(event : any) {
		let target = event.target;
		if (target.localName === "input") {
			for (let i in this.focusInput) {
				this.focusInput[i] = false;
			}
			this.focusInput[target.name] = true;
		}
	}
	onInputBlur() {
		for (let i in this.focusInput) {
			this.focusInput[i] = false;
		}
	}

	onSubmit() {
		const form = this.loginForm.value;
		let user : UserLogin = new UserLogin(form['name'], form['password']);
		this.serverError = '';
		this.authService.login(user)
				.subscribe(
					(data) => {
						this.loginForm.reset();
						this.router.navigate(['home']);
					},
					(error) => {
						this.serverError = error;
					}
				);
	}

	signup() {
		this.router.navigate(['signup']);
	}
}
