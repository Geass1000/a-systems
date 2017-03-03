import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Routing Module */
import { EditorRoutingModule } from './editor-routing.module';

/* App Feature - Component */
import { EditorComponent } from './editor.component';

/* App Feature - Service */
import { AuthService } from '../auth/auth.service';

@NgModule({
  imports:      [ CommonModule, EditorRoutingModule ],
  declarations: [ EditorComponent ],
  exports:      [ EditorComponent ],
  providers:    [ AuthService ]
})
export class EditorModule { }
