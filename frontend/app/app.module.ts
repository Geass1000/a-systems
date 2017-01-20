import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [
		BrowserModule,
		HomeModule,
		AuthModule,
		AppRoutingModule
	],
  declarations: [
		AppComponent,
		NotFoundComponent
	],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
