import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* App Routing - Component */
import { ProfileComponent } from './profile.component';

/* App Routing - Service */
// import { AuthGuard } from '../core/auth-guard.service';

const routes: Routes = [
	{ path: 'profile/:name', component: ProfileComponent },
	{ path: 'profile', component: ProfileComponent }
];
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProfileRoutingModule { }
