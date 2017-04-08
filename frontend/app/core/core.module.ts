import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* App Feature - Service */
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthGuard } from './auth-guard.service';
import { UserService } from './user.service';
import { HttpService } from './http.service';
import { LoggerService } from './logger.service';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [  ],
  exports:      [  ],
  providers:    [
		AUTH_PROVIDERS,
		AuthGuard,
		UserService,
		HttpService,
		LoggerService
	]
})
export class CoreModule {
}
