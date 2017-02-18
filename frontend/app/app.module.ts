import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgReduxModule } from '@angular-redux/store';

/* Feature Modules */
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

/* App Root */
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';

/* App Root - Service*/
import { AppActions } from './app.actions';

@NgModule({
  imports: [
		BrowserModule,
		CoreModule,
		NgReduxModule,
		HomeModule,
		AuthModule,
		ProfileModule,
		AppRoutingModule
	],
  declarations: [
		AppComponent,
		NotFoundComponent
	],
	providers: [ AppActions ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
