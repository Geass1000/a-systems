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
import { DragAndDropDirective } from './drag-and-drop.directive';

/* App Feature - Service */
import { DataLoadService } from './data-load.service';
import { DataInitService } from './data-init.service';
import { MetricService } from './metric.service';

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
		DragAndDropDirective
	],
  exports: [ EditorComponent ],
  providers: [
		MetricService,
		DataLoadService,
		DataInitService
	]
})
export class EditorModule { }
