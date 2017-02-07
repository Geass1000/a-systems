import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';

import { AuthService } from '../auth/auth.service';

import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports:      [ CommonModule, HomeRoutingModule ],
  declarations: [ HomeComponent ],
  exports:      [ HomeComponent ],
  providers:    [ AuthService ]
})
export class HomeModule { }
