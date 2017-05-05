import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* App Feature - Component */
import { WorkstateComponent } from './workstate.component';
import { WorkspaceComponent } from './workspace/workspace.component';

@NgModule({
  imports: [
		CommonModule,
		FormsModule,
		BrowserModule,
		BrowserAnimationsModule
	],
  declarations: [
		WorkstateComponent,
		WorkspaceComponent
	],
  exports:      [ WorkstateComponent ],
  providers:    [ ]
})
export class WorkstateModule { }
