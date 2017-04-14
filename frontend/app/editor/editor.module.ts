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
import { WorkstateComponent } from './workstate/workstate.component';
import { RoomComponent } from './room/room.component';
import { RadioTextureComponent } from './radio-texture/radio-texture.component';

/* App Feature - Service */
import { EditorService } from './editor.service';

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
		WorkstateComponent,
		RoomComponent,
		RadioTextureComponent
	],
  exports:      [ EditorComponent ],
  providers:    [ EditorService ]
})
export class EditorModule { }
