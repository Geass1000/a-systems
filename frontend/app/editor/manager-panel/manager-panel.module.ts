import { NgModule } from '@angular/core';

/* App Feature - Module */
import { SharedModule } from '../../shared/shared.module';

/* Other Module */
import { WorkstateModule } from './workstate/workstate.module';
import { MaterialModule } from './material/material.module';

/* App Feature - Component */
import { ManagerPanelComponent } from './manager-panel.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { DispatcherComponent } from './dispatcher/dispatcher.component';

@NgModule({
  imports: [
		SharedModule,
		WorkstateModule,
		MaterialModule
	],
  declarations: [
		ManagerPanelComponent,
		WorkshopComponent,
		DispatcherComponent
	],
  exports:      [ ManagerPanelComponent ],
  providers:    [ ]
})
export class ManagerPanelModule { }
