import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* App Routing - Component */
import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: '404', component: NotFoundComponent },
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
