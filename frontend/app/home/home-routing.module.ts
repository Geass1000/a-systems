import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* App Routing - Component */
import { HomeComponent } from './home.component';

/* App Routing - Service */
import { AuthGuard } from '../core/auth-guard.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] }
];
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class HomeRoutingModule { }
