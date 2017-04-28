import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Routing Module */
import { EditorRoutingModule } from './editor-routing.module';

/* Other Module */
import { ManagerPanelModule } from './manager-panel/manager-panel.module';
import { ControlPanelModule } from './control-panel/control-panel.module';

/* App Feature - Component */
import { EditorComponent } from './editor.component';
import { SurfaceComponent } from './surface/surface.component';

/* App Feature - Service */
import { DataLoadService } from './data-load.service';
import { EditorService } from './editor.service';
import { MetricService } from './metric.service';
import { DragAndDropService } from './drag-and-drop.service';

@NgModule({
  imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		EditorRoutingModule,
		ManagerPanelModule,
		ControlPanelModule
	],
  declarations: [
		EditorComponent,
		SurfaceComponent
	],
  exports:      [ EditorComponent ],
  providers:    [
		EditorService,
		MetricService,
		DataLoadService,
		DragAndDropService
	]
})
export class EditorModule { }
