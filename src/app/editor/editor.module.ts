import { NgModule } from '@angular/core';

/* App Feature - Module */
import { SharedModule } from '../shared/shared.module';

/* Routing Module */
import { EditorRoutingModule } from './editor-routing.module';

/* Other Module */
import { ManagerPanelModule } from './manager-panel/manager-panel.module';
import { ControlPanelModule } from './control-panel/control-panel.module';

/* App Feature - Component */
import { EditorComponent } from './editor.component';
import { SurfaceComponent } from './surface/surface.component';
import { ThingComponent } from './thing/thing.component';
import { TextureComponent } from './texture/texture.component';

/* App Feature - Directive */
import { DragAndDropMouseDirective } from './drag-and-drop/drag-and-drop-mouse.directive';
import { DragAndDropTouchDirective } from './drag-and-drop/drag-and-drop-touch.directive';
import { DragAndDropKeyboardDirective } from './drag-and-drop/drag-and-drop-keyboard.directive';

/* App Feature - Service */
import { EditorService } from './editor.service';
import { DataInitService } from './data-init.service';
import { MetricService } from './metric.service';
import { DragAndDropService } from './drag-and-drop/drag-and-drop.service';

@NgModule({
  imports: [
		SharedModule,
		EditorRoutingModule,
		ManagerPanelModule,
		ControlPanelModule
	],
  declarations: [
		EditorComponent,
		SurfaceComponent,
		ThingComponent,
		TextureComponent,
		DragAndDropMouseDirective,
		DragAndDropTouchDirective,
		DragAndDropKeyboardDirective
	],
  exports: [ EditorComponent ],
  providers: [
		MetricService,
		EditorService,
		DataInitService,
		DragAndDropService
	]
})
export class EditorModule { }
