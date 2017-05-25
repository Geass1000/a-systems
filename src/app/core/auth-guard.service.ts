import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

/* App Services */
import { LoggerService } from './logger.service';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor (private router: Router,
							 private logger : LoggerService,
						 	 private userService : UserService) { ; }

	/**
	 * canActivate - выполняет проверку перехода.
	 *
	 * @method
	 *
	 * @return {boolean}
	 */
  canActivate() {
		if (this.userService.loggedIn()) {
			this.logger.info(`${this.constructor.name} - canActivate:`, true);
			return true;
		} else {
			this.logger.info(`${this.constructor.name} - canActivate:`, false);
			this.router.navigate(['/']);
			return false;
		}
  }
}
