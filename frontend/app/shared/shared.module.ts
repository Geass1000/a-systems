import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { OnlyNumber } from './directives/only-number.directive';

@NgModule({
  imports: [
		CommonModule
	],
  declarations: [
		OnlyNumber
	],
  exports: [
		// Modules
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		// Directives
		OnlyNumber
	]
})
export class SharedModule {
}
