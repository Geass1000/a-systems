import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Routing Module */
import { ProfileRoutingModule } from './profile-routing.module';

/* App Feature - Component */
import { ProfileComponent } from './profile.component';

/* App Feature - Service */
import { ProfileService } from './profile.service';
/* ----- */

@NgModule({
  imports:      [ CommonModule, ProfileRoutingModule ],
  declarations: [ ProfileComponent ],
  exports:      [  ],
  providers:    [ ProfileService ]
})
export class ProfileModule { }
