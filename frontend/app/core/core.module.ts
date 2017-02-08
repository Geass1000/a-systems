import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* App Feature - Service */
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthGuard } from './auth-guard.service';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [  ],
  exports:      [  ],
  providers:    [ AuthGuard, AUTH_PROVIDERS ]
})
export class CoreModule {
}
