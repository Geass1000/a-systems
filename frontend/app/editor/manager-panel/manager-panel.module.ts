import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* App Feature - Component */
import { ManagerPanelComponent } from './manager-panel.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { WorkstateComponent } from './workstate/workstate.component';
import { RadioTextureComponent } from './radio-texture/radio-texture.component';

@NgModule({
  imports: [
		CommonModule,
		FormsModule,
		BrowserModule,
		BrowserAnimationsModule
	],
  declarations: [
		ManagerPanelComponent,
		WorkshopComponent,
		WorkstateComponent,
		RadioTextureComponent
	],
  exports:      [ ManagerPanelComponent ],
  providers:    [ ]
})
export class ManagerPanelModule { }
