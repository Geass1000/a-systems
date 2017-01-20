import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupComponent } from './signup.component';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports:      [ CommonModule, AuthRoutingModule ],
  declarations: [ SignupComponent ],
  exports:      [ SignupComponent ],
  providers:    [  ]
})
export class AuthModule { }
