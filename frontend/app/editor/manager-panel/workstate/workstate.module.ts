import { NgModule } from '@angular/core';

/* App Feature - Module */
import { SharedModule } from '../../../shared/shared.module';

/* App Feature - Component */
import { WorkstateComponent } from './workstate.component';
import { WorkspaceComponent } from './workspace/workspace.component';

@NgModule({
  imports: [
		SharedModule,
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
