import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* App Feature - Component */
import { ManagerComponent } from './manager.component';
import { WorkstateComponent } from './workstate/workstate.component';
import { RadioTextureComponent } from './radio-texture/radio-texture.component';

@NgModule({
  imports: [
		CommonModule,
		FormsModule
	],
  declarations: [
		ManagerComponent,
		WorkstateComponent,
		RadioTextureComponent
	],
  exports:      [ ManagerComponent ],
  providers:    [ ]
})
export class ManagerModule { }
