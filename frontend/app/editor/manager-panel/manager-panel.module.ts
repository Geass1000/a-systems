import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* App Feature - Module */
import { SharedModule } from '../../shared/shared.module';

/* Other Module */
import { WorkstateModule } from './workstate/workstate.module';

/* App Feature - Component */
import { ManagerPanelComponent } from './manager-panel.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { MaterialComponent } from './material/material.component';

@NgModule({
  imports: [
		SharedModule,
		BrowserModule,
		BrowserAnimationsModule,
		WorkstateModule
	],
  declarations: [
		ManagerPanelComponent,
		WorkshopComponent,
		MaterialComponent
	],
  exports:      [ ManagerPanelComponent ],
  providers:    [ ]
})
export class ManagerPanelModule { }
