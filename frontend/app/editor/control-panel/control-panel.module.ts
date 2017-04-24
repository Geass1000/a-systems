import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* App Feature - Component */
import { ControlPanelComponent } from './control-panel.component';
import { InitWorkspaceComponent } from './init-workspace/init-workspace.component';

@NgModule({
  imports: [
		CommonModule,
		FormsModule,
		BrowserModule,
		BrowserAnimationsModule
	],
  declarations: [
		ControlPanelComponent,
		InitWorkspaceComponent
	],
  exports:      [ ControlPanelComponent ],
  providers:    [ ]
})
export class ControlPanelModule { }
