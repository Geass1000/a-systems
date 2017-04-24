import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* App Feature - Component */
import { ControlPanelComponent } from './control-panel.component';
import { InitProjectComponent } from './init-project/init-project.component';

@NgModule({
  imports: [
		CommonModule,
		FormsModule,
		BrowserModule,
		BrowserAnimationsModule
	],
  declarations: [
		ControlPanelComponent,
		InitProjectComponent
	],
  exports:      [ ControlPanelComponent ],
  providers:    [ ]
})
export class ControlPanelModule { }
