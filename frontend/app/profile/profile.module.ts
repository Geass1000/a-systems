import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Routing Module */
import { ProfileRoutingModule } from './profile-routing.module';

/* App Feature - Component */
import { ProfileComponent } from './profile.component';

/* App Feature - Service */
/* ----- */

@NgModule({
  imports:      [ CommonModule, ProfileRoutingModule ],
  declarations: [ ProfileComponent ],
  exports:      [  ],
  providers:    [  ]
})
export class ProfileModule { }
