import { Component } from '@angular/core';

import { UserService } from './core/user.service';

@Component({
	moduleId: module.id,
  selector: 'as-app',
	templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ]
})
export class AppComponent  {
	title = 'Main';

	constructor (public userService : UserService ) { ; }

	loggedIn () {
		return this.userService.loggedIn();
	}

	logout () {
		this.userService.logout();
	}
}
