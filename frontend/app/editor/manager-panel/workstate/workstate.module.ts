import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* App Feature - Module */
import { SharedModule } from '../../../shared/shared.module';

/* App Feature - Component */
import { WorkstateComponent } from './workstate.component';
import { WorkspaceComponent } from './workspace/workspace.component';

@NgModule({
  imports: [
		SharedModule,
		BrowserModule,
		BrowserAnimationsModule,
		SharedModule
	],
  declarations: [
		WorkstateComponent,
		WorkspaceComponent
	],
  exports:      [ WorkstateComponent ],
  providers:    [ ]
})
export class WorkstateModule { }
