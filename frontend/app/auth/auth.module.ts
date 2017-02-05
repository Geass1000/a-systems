import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthRoutingModule } from './auth-routing.module';

import { SignupComponent } from './signup.component';
import { LoginComponent } from './login.component';

import { AuthService } from './auth.service';

@NgModule({
  imports: [
		CommonModule,
		AuthRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		HttpModule
	],
  declarations: [
		SignupComponent,
		LoginComponent
	],
  exports: [ SignupComponent ],
  providers: [
		AuthService
	]
})
export class AuthModule { }
