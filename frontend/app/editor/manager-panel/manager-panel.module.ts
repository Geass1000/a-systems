import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Other Module */
import { WorkstateModule } from './workstate/workstate.module';

/* App Feature - Component */
import { ManagerPanelComponent } from './manager-panel.component';
import { WorkshopComponent } from './workshop/workshop.component';

@NgModule({
  imports: [
		CommonModule,
		FormsModule,
		BrowserModule,
		BrowserAnimationsModule,
		WorkstateModule
	],
  declarations: [
		ManagerPanelComponent,
		WorkshopComponent
	],
  exports:      [ ManagerPanelComponent ],
  providers:    [ ]
})
export class ManagerPanelModule { }
