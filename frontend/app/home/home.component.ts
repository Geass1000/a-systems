import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
	moduleId: module.id,
  selector: 'as-home',
	templateUrl: 'home.component.html',
  styleUrls: [ 'home.component.css' ]
})
export class HomeComponent  {
	title = 'Home';

	constructor (private authService : AuthService) { ; }

	logout () {
		this.authService.logout();
	}
}
