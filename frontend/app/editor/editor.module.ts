import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Routing Module */
import { EditorRoutingModule } from './editor-routing.module';

/* App Feature - Component */
import { EditorComponent } from './editor.component';
import { RoomComponent } from './room/room.component';

/* App Feature - Service */
import { AuthService } from '../auth/auth.service';

@NgModule({
  imports:      [ CommonModule, EditorRoutingModule ],
  declarations: [
		EditorComponent,
		RoomComponent
	],
  exports:      [ EditorComponent ],
  providers:    [ AuthService ]
})
export class EditorModule { }
