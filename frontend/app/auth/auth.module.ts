import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports:      [
		CommonModule,
		AuthRoutingModule,
		ReactiveFormsModule
	],
  declarations: [ SignupComponent ],
  exports:      [ SignupComponent ],
  providers:    [  ]
})
export class AuthModule { }
