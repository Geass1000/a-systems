import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* App Routing - Component */
import { EditorComponent } from './editor.component';

/* App Service */
import { AuthGuard } from '../core/auth-guard.service';
// { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] }

const routes : Routes = [
	{ path: 'editor', component: EditorComponent, canActivate: [ AuthGuard ] }
];
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class EditorRoutingModule { }
