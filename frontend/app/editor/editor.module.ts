import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* Routing Module */
import { EditorRoutingModule } from './editor-routing.module';

/* App Feature - Component */
import { EditorComponent } from './editor.component';
import { InitWorkspaceComponent } from './init-workspace/init-workspace.component';
import { WorkstateComponent } from './workstate/workstate.component';
import { RoomComponent } from './room/room.component';

/* App Feature - Service */
import { AuthService } from '../auth/auth.service';

@NgModule({
  imports: [
		CommonModule,
		FormsModule,
		EditorRoutingModule
	],
  declarations: [
		EditorComponent,
		InitWorkspaceComponent,
		WorkstateComponent,
		RoomComponent
	],
  exports:      [ EditorComponent ],
  providers:    [ AuthService ]
})
export class EditorModule { }
