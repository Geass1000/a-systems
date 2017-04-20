import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* Routing Module */
import { EditorRoutingModule } from './editor-routing.module';

/* Other Module */
import { ManagerModule } from './manager/manager.module';

/* App Feature - Component */
import { EditorComponent } from './editor.component';
import { InitWorkspaceComponent } from './init-workspace/init-workspace.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { RoomComponent } from './room/room.component';

/* App Feature - Service */
import { EditorService } from './editor.service';
import { MetricService } from './metric.service';

@NgModule({
  imports: [
		CommonModule,
		FormsModule,
		EditorRoutingModule,
		ManagerModule
	],
  declarations: [
		EditorComponent,
		InitWorkspaceComponent,
		ControlPanelComponent,
		RoomComponent
	],
  exports:      [ EditorComponent ],
  providers:    [
		EditorService,
		MetricService 
	]
})
export class EditorModule { }
