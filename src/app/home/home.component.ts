import { Component } from '@angular/core';

import { UserService } from '../core/user.service';

@Component({
	moduleId: module.id,
  selector: 'as-home',
	templateUrl: 'home.component.html',
  styleUrls: [ 'home.component.css' ]
})
export class HomeComponent  {
	title = 'Home';

	constructor (private userService : UserService) { ; }

	logout () {
		this.userService.logout();
	}
}
