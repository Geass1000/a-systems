import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';

/* App Feature - Service */
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthGuard } from './auth-guard.service';
import { UserService } from './user.service';
import { ProjectService } from './project.service';
import { HttpService } from './http.service';
import { LoggerService } from './logger.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [
		{
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
		AuthGuard,
		UserService,
    ProjectService,
		HttpService,
		LoggerService
	]
})
export class CoreModule {
}