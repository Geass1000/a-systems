import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* App Feature - Module */
import { SharedModule } from '../../shared/shared.module';

/* App Feature - Component */
import { ControlPanelComponent } from './control-panel.component';
import { InitProjectComponent } from './init-project/init-project.component';

@NgModule({
  imports: [
		SharedModule,
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
