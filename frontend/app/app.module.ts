import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* Feature Modules */
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

/* App Root */
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [
		BrowserModule,
		CoreModule,
		HomeModule,
		AuthModule,
		AppRoutingModule
	],
  declarations: [
		AppComponent,
		NotFoundComponent
	],
	providers: [  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
