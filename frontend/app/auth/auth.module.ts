import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

/* App Feature - Module */
import { SharedModule } from '../shared/shared.module';

/* App Feature - Component */
import { SignupComponent } from './signup.component';
import { LoginComponent } from './login.component';
import { ResetComponent } from './reset.component';

/* App Feature - Service */
import { AuthService } from './auth.service';

@NgModule({
  imports: [
		HttpModule,
		SharedModule
	],
  declarations: [
		SignupComponent,
		LoginComponent,
		ResetComponent
	],
  exports: [
		SignupComponent,
		LoginComponent,
		ResetComponent
	],
  providers: [
		AuthService
	]
})
export class AuthModule { }
