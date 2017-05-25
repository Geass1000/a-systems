import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Routing Module */
import { HomeRoutingModule } from './home-routing.module';

/* App Feature - Component */
import { HomeComponent } from './home.component';

@NgModule({
  imports:      [ CommonModule, HomeRoutingModule ],
  declarations: [ HomeComponent ],
  exports:      [ HomeComponent ],
  providers:    [ ]
})
export class HomeModule { }
