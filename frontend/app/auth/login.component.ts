import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

	user : UserLogin = new UserLogin('', '');

	constructor (private authService : AuthService,
							 private router: Router) { ; }

	ngOnInit (): void {
    ;
  }

	onSubmit() {
		this.authService.login(this.user)
				.subscribe(
					(data) => {
						console.log(localStorage.getItem('id_token'));
						this.router.navigate(['home']);
					},
					(error) => {
						console.log(error);
					}
				);
	}
}
