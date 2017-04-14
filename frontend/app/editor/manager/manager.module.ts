import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


/* App Feature - Component */
import { ManagerComponent } from './manager.component';

/* App Feature - Service */


@NgModule({
  imports: [
		CommonModule,
		FormsModule
	],
  declarations: [
		ManagerComponent
	],
  exports:      [ ManagerComponent ],
  providers:    [  ]
})
export class ManagerModule { }
