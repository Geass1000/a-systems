import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OnlyNumberDirective } from './directives/only-number.directive';

@NgModule({
  imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule
	],
  declarations: [
		OnlyNumberDirective
	],
  exports: [
		// Modules
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserModule,
		BrowserAnimationsModule,
		// Directives
		OnlyNumberDirective
	]
})
export class SharedModule {
}
