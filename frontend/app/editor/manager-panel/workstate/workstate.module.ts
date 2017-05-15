import { NgModule } from '@angular/core';

/* App Feature - Module */
import { SharedModule } from '../../../shared/shared.module';

/* App Feature - Component */
import { WorkstateComponent } from './workstate.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { SurfaceComponent } from './surface/surface.component';
import { ThingComponent } from './thing/thing.component';

@NgModule({
  imports: [
		SharedModule,
		SharedModule
	],
  declarations: [
		WorkstateComponent,
		WorkspaceComponent,
		SurfaceComponent,
		ThingComponent
	],
  exports:      [ WorkstateComponent ],
  providers:    [ ]
})
export class WorkstateModule { }
