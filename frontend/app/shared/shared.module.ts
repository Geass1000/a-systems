import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OnlyNumber } from './directives/only-number.directive';

@NgModule({
  imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule
	],
  declarations: [
		OnlyNumber
	],
  exports: [
		// Modules
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserModule,
		BrowserAnimationsModule,
		// Directives
		OnlyNumber
	]
})
export class SharedModule {
}
