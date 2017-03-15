import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgReduxModule } from '@angular-redux/store';

/* Feature Modules */
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { EditorModule } from './editor/editor.module';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

/* App Root */
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';

/* App Root - Service*/
import { ModalActions } from './actions/modal.actions';
import { EditorActions } from './actions/editor.actions';

@NgModule({
  imports: [
		BrowserModule,
		CoreModule,
		NgReduxModule,
		HomeModule,
		AuthModule,
		ProfileModule,
		EditorModule,
		AppRoutingModule
	],
  declarations: [
		AppComponent,
		NotFoundComponent
	],
	providers: [
		ModalActions,
		EditorActions
	],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
