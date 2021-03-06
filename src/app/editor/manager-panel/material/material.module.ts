import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* App Feature - Module */
import { SharedModule } from '../../../shared/shared.module';

/* App Feature - Component */
import { MaterialComponent } from './material.component';
import { TextureComponent } from './texture/texture.component';
import { ColorRgbaComponent } from './color-rgba/color-rgba.component';

@NgModule({
  imports: [
		SharedModule,
		BrowserModule,
		BrowserAnimationsModule,
		SharedModule
	],
  declarations: [
		MaterialComponent,
		TextureComponent,
		ColorRgbaComponent
	],
  exports:      [ MaterialComponent ],
  providers:    [ ]
})
export class MaterialModule { }
