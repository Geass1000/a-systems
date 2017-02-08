import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Routing Module */
import { HomeRoutingModule } from './home-routing.module';

/* App Feature - Component */
import { HomeComponent } from './home.component';

/* App Feature - Service */
import { AuthService } from '../auth/auth.service';

@NgModule({
  imports:      [ CommonModule, HomeRoutingModule ],
  declarations: [ HomeComponent ],
  exports:      [ HomeComponent ],
  providers:    [ AuthService ]
})
export class HomeModule { }
